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
} from "@xyflow/react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import {
  changeEdges,
  changeSteps,
} from "@/lib/store/slices/workflowSlice";

import Step from "@/lib/types/workflow/step";

import "@xyflow/react/dist/style.css";
import React, { useCallback, useRef, useState } from "react";

export default function Example() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.workflow.data.steps);
  const edges = useSelector((state: RootState) => state.workflow.data.edges);
  const [selfEdges, setSelfEdges] = useState<Array<Edge>>(edges);
  const [selfNodes, setSelfNodes] = useState<Array<Node>>(nodes);
  const edgeReconnectSuccessful = useRef(true);

  const onNodeDragStop = (
    event: React.MouseEvent,
    node: Node,
    nodes: Node[]
  ) => {
    dispatch(changeSteps(selfNodes));
    dispatch(changeEdges(selfEdges));
  };

  const onNodesChange = (changes: NodeChange<Node>[]) => {
    setSelfNodes((s) => applyNodeChanges(changes, selfNodes));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setSelfEdges((s) => applyEdgeChanges(changes, selfEdges));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const step: Step = JSON.parse(data);

    setSelfNodes((nds) => [
      ...nds,
      {
        id: `${Date.now()}`,
        data: { label: step.name },
        position: { x: 0, y: 200 },
      },
    ]);

    dispatch(changeSteps(selfNodes));
  };

  const handleDragOver = (e) => {
    // 允许拖拽元素进入这个区域
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onConnect = useCallback((params: Connection) => {
    setSelfEdges((eds) => addEdge(params, eds));
  }, []);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setSelfEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    []
  );

  const onReconnectEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setSelfEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);

  return (
    <div className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow
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
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Cross} gap={30} size={6} />
      </ReactFlow>
    </div>
  );
}
