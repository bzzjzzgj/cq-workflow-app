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
    Viewport, useNodesState, useEdgesState
} from "@xyflow/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

import {
    changeEdges,
    changeSteps,
    selected
} from "@/lib/store/slices/workflowSlice";

import Step from "@/lib/types/workflow/step";

import "@xyflow/react/dist/base.css";

import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import TextUpdaterNode from "@/components/workflow/custom-node";
import { EdgeData, NodeData } from "@/lib/types/workflow/xyflow";
import CustomEdge from "@/components/workflow/custom-edge";
import StepStart from "@/components/workflow/steps/step-start";
import StepEnd from "@/components/workflow/steps/step-end";

export default function Example() {
    const dispatch = useDispatch<AppDispatch>();

    const initNodes = useSelector((state: RootState) => state.workflow.data.steps);
    const initEdges = useSelector((state: RootState) => state.workflow.data.edges);

    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgeChange] = useEdgesState(initEdges);


    const edgeReconnectSuccessful = useRef(true);

    const nodeTypes = useMemo(() => ({
        "custom": TextUpdaterNode,
        "step-start": StepStart,
        "step-end": StepEnd
    }), []);
    const edgeTypes = useMemo(() => ({ "custom-edge": CustomEdge }), []);

    const canvasX = useRef(0);
    const canvasY = useRef(0);

    // useEffect(() => {
    //     setNodes(initNodes);
    // }, [initNodes]);

    useOnViewportChange({
        onEnd: (viewport: Viewport) => {
            canvasX.current = viewport.x;
            canvasY.current = viewport.y;
        }
    });

    const onNodeDragStop = (
        event: React.MouseEvent,
        node: Node,
        _: Node[]
    ) => {
        dispatch(changeSteps(nodes));
        dispatch(changeEdges(edges));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const data = e.dataTransfer.getData("application/json");
        const step: Step = JSON.parse(data);

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - canvasX.current;
        const y = e.clientY - rect.top - canvasY.current;

        setNodes((nds) => [
            ...nds,
            {
                id: `${Date.now()}`,
                data: { name: step.name, value: step.id },
                position: { x: x, y: y },
                type: step.type
            }
        ]);
        dispatch(changeSteps(nodes));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        // 允许拖拽元素进入这个区域
        e.preventDefault();

        e.dataTransfer.dropEffect = "move";
    };

    const onConnect = useCallback((params: Connection) => {
        const edge: Edge<EdgeData> = { ...params, type: "custom-edge", id: `${Date.now()}` };
        setEdges((eds) => addEdge(edge, eds));
    }, []);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback(
        (oldEdge: Edge<EdgeData>, newConnection: Connection) => setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
        []
    );

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
    }, []);

    const onNodeClick = useCallback(
        (event: React.MouseEvent, node: Node<NodeData>) => {
            console.log(node);
            dispatch(selected(node));
        },
        []
    );

    return (
        <div className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver}>
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgeChange}
                onNodeDragStop={onNodeDragStop}
                onConnect={onConnect}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                proOptions={{
                    account: "free",
                    hideAttribution: true
                }}
                minZoom={1}
                maxZoom={1}
                onNodeClick={onNodeClick}
            >
                <Controls showZoom={false} />
                <MiniMap />
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
