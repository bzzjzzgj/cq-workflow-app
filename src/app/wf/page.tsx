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
} from "@xyflow/react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  changeEdges,
  changeSteps,
  addStep,
  addEdge,
} from "@/store/slices/workflowSlice";

import Step from "@/types/workflow/step";

import "@xyflow/react/dist/style.css";
import React, { useState } from "react";

export default function Example() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.workflow.steps);
  const edges = useSelector((state: RootState) => state.workflow.edges);
  const [selfEdges, setSelfEdges] = useState<Array<Edge>>([]);
  const [selfNodes, setSelfNodes] = useState<Array<Node>>([]);

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

    // dispatch(
    //   addStep({
    //     id: `${Date.now()}`,
    //     data: { label: step.name },
    //     position: { x: 0, y: 200 },
    //   })
    // );

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

  return (
    <div className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow
        nodes={selfNodes}
        edges={selfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
