"use client";

import { Badge } from "@/components/ui/catalyst/badge";
import React from "react";

const steps = [
  {
    id: 1,
    name: "开始",
    color: "lime",
  },
  {
    id: 2,
    name: "help wanted",
    color: "purple",
  },
  {
    id: 3,
    name: "bug",
    color: "rose",
  },
  {
    id: 4,
    name: "bug2",
    color: "rose",
  },
];

export default function WfSidebar() {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    step: any
  ) => {
    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
      dataTransfer.setData("application/json", JSON.stringify(step));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {steps.map((step) => (
        <Badge
          key={step.id}
          draggable
          className="flex items-center justify-center h-10 cursor-pointer"
          onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
            handleDragStart(e, step)
          }
        >
          {step.name}
        </Badge>
      ))}
    </div>
  );
}
