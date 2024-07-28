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
} from "@xyflow/react";
import Step from "@/types/workflow/step";

import "@xyflow/react/dist/style.css";
import { useState } from "react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Example() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = (changes: any[]) => {
    // 这里应用任何必要的变化到你的节点数据
    // 例如使用applyNodeChanges函数
    // const newNodes = applyNodeChanges(changes, nodes);
    // 然后更新状态
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const step: Step = JSON.parse(data);

    initialNodes.push({
      id: "drop" + step.id,
      data: { label: step.name },
      position: { x: 0, y: 200 },
    });

    console.log("Drop", initialNodes);
  };

  const handleDragOver = (e) => {
    // 允许拖拽元素进入这个区域
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
