"use client";

import {
    Background,
    BackgroundVariant,
    Controls,
    EdgeChange,
    MiniMap,
    NodeChange,
    ReactFlow,
    applyEdgeChanges,
    applyNodeChanges,
    Node,
    Edge,
    Connection,
    addEdge,
    reconnectEdge,
    useOnViewportChange,
    ReactFlowProvider,
    Viewport,
} from "@xyflow/react";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";

import {
    changeEdges,
    changeSteps,
    selected,
} from "@/lib/store/slices/workflowSlice";

import Step from "@/lib/types/workflow/step";

import "@xyflow/react/dist/base.css";

import React, {useCallback, useMemo, useRef, useState, useEffect} from "react";
import TextUpdaterNode from "@/components/workflow/textUpdateNode";
import {EdgeData, NodeData} from "@/lib/types/workflow/xyflow";
import CustomEdge from "@/components/workflow/customEdge";

export default function Example() {
    const dispatch = useDispatch();

    const nodes = useSelector((state: RootState) => state.workflow.data.steps);
    const edges = useSelector((state: RootState) => state.workflow.data.edges);
    const currentNode = useSelector((state: RootState) => state.workflow.currentNode);
    const [selfEdges, setSelfEdges] = useState<Array<Edge<EdgeData>>>(edges);
    const [selfNodes, setSelfNodes] = useState<Array<Node<NodeData>>>(nodes);

    const edgeReconnectSuccessful = useRef(true);
    const nodeTypes = useMemo(() => ({textUpdater: TextUpdaterNode}), []);

    const edgeTypes = useMemo(() => ({"custom-edge": CustomEdge}), []);
    const canvasX = useRef(0);
    const canvasY = useRef(0);

    useEffect(() => {
        if (currentNode) {
            // setSelfNodes(nds => {
            //     const ls = nds.filter(s => s.id !== currentNode.id);
            //     return [...ls, currentNode];
            // });

            setSelfNodes(nds => nds.map(node => {
                if (node.id === currentNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            name: currentNode.data.name
                        }
                    }
                }
                return node;
            }))
        }
    }, [currentNode]);

    useOnViewportChange({
        onEnd: (viewport: Viewport) => {
            canvasX.current = viewport.x;
            canvasY.current = viewport.y;
        },
    });

    const onNodeDragStop = (
        event: React.MouseEvent,
        node: Node,
        nodes: Node[]
    ) => {
        dispatch(changeSteps(selfNodes));
        dispatch(changeEdges(selfEdges));
    };

    const onNodesChange = (changes: NodeChange<Node<NodeData>>[]) => {
        setSelfNodes((s) => applyNodeChanges(changes, selfNodes));
    };

    const onEdgesChange = (changes: EdgeChange<Edge<EdgeData>>[]) => {
        setSelfEdges((s) => applyEdgeChanges(changes, selfEdges));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        const step: Step = JSON.parse(data);

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - canvasX.current;
        const y = e.clientY - rect.top - canvasY.current;

        setSelfNodes((nds) => [
            ...nds,
            {
                id: `${Date.now()}`,
                data: {name: step.name, value: step.id},
                position: {x: x, y: y},
                type: "textUpdater",
            },
        ]);

        dispatch(changeSteps(selfNodes));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        // 允许拖拽元素进入这个区域
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onConnect = useCallback((params: Connection) => {
        const edge: Edge<EdgeData> = {...params, type: "custom-edge", id: ""};
        setSelfEdges((eds) => addEdge(edge, eds));
    }, []);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback(
        (oldEdge: Edge<EdgeData>, newConnection: Connection) =>
            setSelfEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
        []
    );

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setSelfEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
    }, []);

    const onNodeClick = useCallback(
        (event: React.MouseEvent, node: Node<NodeData>) => {
            dispatch(selected(node));
        },
        []
    );

    return (
        <div className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver}>
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={selfNodes}
                edges={selfEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
                onConnect={onConnect}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                proOptions={{
                    account: "free",
                    hideAttribution: true,
                }}
                minZoom={1}
                maxZoom={1}
                onNodeClick={onNodeClick}
            >
                <Controls showZoom={false}/>
                <MiniMap/>
                <Background
                    id="1"
                    gap={10}
                    color="#f1f1f1"
                    variant={BackgroundVariant.Lines}
                />

                <Background
                    id="2"
                    gap={100}
                    color="#ccc"
                    variant={BackgroundVariant.Lines}
                />
            </ReactFlow>
        </div>
    );
}
