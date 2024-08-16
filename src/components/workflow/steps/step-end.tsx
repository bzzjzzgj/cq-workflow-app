import { Handle, NodeToolbar, Position } from "@xyflow/react";
import Toolbar from "@/components/workflow/toolbar";

export default function StepEnd({ id }: { id: string }) {
    return (
        <>
            <div className="rounded-full w-20 h-20 border-2 border-teal-500 flex items-center justify-center bg-white">
                结束
            </div>

            {/* 点击节点时弹出的菜单 */}
            <Toolbar id={id} />


            {/* 右侧端口 */}
            <Handle
                type="target"
                position={Position.Left}
                className="h-6 !bg-teal-500"
            />
        </>
    );
}