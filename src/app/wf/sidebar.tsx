"use client";

import React from "react";
import { Badge } from "@/components/ui/catalyst/badge";
import Step from "@/types/workflow/step";

const steps: Array<Step> = [
  {
    id: "1",
    name: "开始",
    color: "lime",
  },
  {
    id: "2",
    name: "help wanted",
    color: "purple",
  },
  {
    id: "3",
    name: "bug",
    color: "rose",
  },
  {
    id: "4",
    name: "bug2",
    color: "rose",
  },
];

export default function WfSidebar() {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    step: Step
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
          color={step.color}
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
