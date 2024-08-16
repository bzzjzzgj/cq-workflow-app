import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Edge, Node} from "@xyflow/react";
import {EdgeData, NodeData} from "@/lib/types/workflow/xyflow";

interface Workflow {
    steps: Array<Node<NodeData>>;
    edges: Array<Edge<EdgeData>>;
}

interface WorkflowState {
    data: Workflow;
    currentNode?: Node<NodeData>;
    loading: boolean;
    error: string | null;
}

const initialState: WorkflowState = {
    data: {steps: [], edges: []},
    loading: false,
    error: null,
};

export const fetchWorkflows = createAsyncThunk(
    "workflow/fetchWorkflows",
    async () => {
        const response = await fetch("http://localhost:3000/workflows");
        let data: any;
        data = await response.json();
        return data;
    }
);

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        changeSteps: (state, action: PayloadAction<Array<Node<NodeData>>>) => {
            state.data.steps = action.payload;
        },
        changeEdges: (state, action: PayloadAction<Array<Edge<EdgeData>>>) => {
            state.data.edges = action.payload;
        },
        addStep: (state, action: PayloadAction<Node<NodeData>>) => {
            state.data.steps.push(action.payload);
        },
        addEdge: (state, action: PayloadAction<Edge<EdgeData>>) => {
            state.data.edges.push(action.payload);
        },
        selected: (state, action: PayloadAction<Node<NodeData>>) => {
            state.currentNode = action.payload;
        },
        updateNodeName: (state, action: PayloadAction<string>) => {
            if (state.currentNode) {
                state.currentNode.data.name = action.payload;
                state.data.steps = [...state.data.steps.filter(s => s.id !== state.currentNode?.id), state.currentNode];
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWorkflows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchWorkflows.fulfilled,
                (state, action: PayloadAction<Workflow>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(fetchWorkflows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "请求工作流定义发生错误";
            });
    },
});

export const {
    changeSteps,
    changeEdges,
    addStep,
    addEdge,
    selected,
    updateNodeName,
} = workflowSlice.actions;
export default workflowSlice.reducer;
