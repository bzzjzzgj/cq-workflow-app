import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge, Node } from "@xyflow/react";

interface Workflow {
  steps: Array<Node>;
  edges: Array<Edge>;
}

interface WorkflowState {
  workflow: Workflow;
  loading: boolean;
  error: string | null;
}

const initialState: WorkflowState = {
  workflow: { steps: [], edges: [] },
  loading: false,
  error: null,
};

export const fetchWorkflows = createAsyncThunk(
  "workflow/fetchWorkflows",
  async () => {
    const response = await fetch("http://localhost:3000/workflows");
    const data = await response.json();
    return data;
  }
);

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    changeSteps: (state, action: PayloadAction<Array<Node>>) => {
      state.workflow.steps = action.payload;
    },
    changeEdges: (state, action: PayloadAction<Array<Edge>>) => {
      state.workflow.edges = action.payload;
    },
    addStep: (state, action: PayloadAction<Node>) => {
      state.workflow.steps.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.workflow.edges.push(action.payload);
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
          state.workflow = action.payload;
        }
      )
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "请求工作流定义发生错误";
      });
  },
});

export const { changeSteps, changeEdges, addStep, addEdge } =
  workflowSlice.actions;
export default workflowSlice.reducer;
