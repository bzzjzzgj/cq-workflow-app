import { NodeData } from "@/lib/types/workflow/xyflow";
import { Handle, NodeToolbar, Position, Node, NodeResizer } from "@xyflow/react";

export default function TextUpdaterNode({ id, data }: {
    id: string;
    data: NodeData;
}) {
    return (

        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 max-w-60">
            <div className="flex">
                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                    😀
                </div>
                <div className="ml-2">
                    <div className="text-lg font-bold">{data.name}</div>
                    <div className="text-gray-500">1234</div>
                </div>
            </div>

            {/* 点击节点时弹出的菜单 */}


            {/* 左侧端口 */}
            <Handle
                type="target"
                position={Position.Left}
                className="h-6 !bg-teal-500"
            />

            {/* 右侧端口 */}
            <Handle
                type="source"
                position={Position.Right}
                className="h-6 !bg-teal-500"
            />
        </div>

    );
}
