"use client";

import React from "react";
import { Badge } from "@/components/ui/catalyst/badge";
import Step from "@/lib/types/workflow/step";

const steps: Array<Step> = [
    {
        id: "1",
        name: "开始",
        color: "lime",
        type: "step-start"
    },
    {
        id: "end",
        name: "结束",
        color: "lime",
        type: "step-end"
    },
    {
        id: "2",
        name: "help wanted",
        color: "purple",
        type:"custom"
    },
    {
        id: "3",
        name: "bug",
        color: "rose",
        type:"custom"
    },
    {
        id: "4",
        name: "bug2",
        color: "rose",
        type:"custom"
    }
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
