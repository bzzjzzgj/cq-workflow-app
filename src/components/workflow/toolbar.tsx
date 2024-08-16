import { NodeToolbar, useReactFlow, Node } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { changeSteps } from "@/lib/store/slices/workflowSlice";
import { NodeData } from "@/lib/types/workflow/xyflow";

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
            <NodeToolbar className="flex flex-row gap-4">
                <button onClick={handleDelete}>删除</button>
            </NodeToolbar>
        </>
    );
}