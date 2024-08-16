import { NodeToolbar, useReactFlow, Node } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { changeSteps } from "@/lib/store/slices/workflowSlice";
import { NodeData } from "@/lib/types/workflow/xyflow";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/shadcn/toggle-group";

export default function Toolbar({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { setNodes, getNodes } = useReactFlow();

    const handleDelete = () => {
        setNodes(nds => nds.filter(s => s.id !== id));
        const nodes = getNodes();
        dispatch(changeSteps(nodes as Node<NodeData>[]));
    };

    return (
        <>
            <NodeToolbar>
                <ToggleGroup type="single" className="bg-white shadow-md border rounded">
                    <ToggleGroupItem value="a">删除</ToggleGroupItem>
                    <ToggleGroupItem value="b">B</ToggleGroupItem>
                    <ToggleGroupItem value="c">C</ToggleGroupItem>
                </ToggleGroup>
            </NodeToolbar>
        </>
    );
}