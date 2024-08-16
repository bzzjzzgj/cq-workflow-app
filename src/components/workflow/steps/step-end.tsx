import { Handle, NodeToolbar, Position } from "@xyflow/react";

export default function StepEnd({ id }: { id: string }) {
    return (
        <>
            <div className="rounded-full w-20 h-20 border-2 border-teal-500 flex items-center justify-center bg-white">
                结束
            </div>

            {/* 点击节点时弹出的菜单 */}
            <NodeToolbar className="flex flex-row gap-4">
                <button>删除</button>
                <button>拷贝</button>
                <button>展开</button>
            </NodeToolbar>


            {/* 右侧端口 */}
            <Handle
                type="source"
                position={Position.Left}
                className="h-6 !bg-teal-500"
            />
        </>
    );
}