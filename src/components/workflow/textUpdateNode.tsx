import { NodeData } from "@/lib/types/workflow/xyflow";
import { Handle, NodeToolbar, Position, Node } from "@xyflow/react";

const handleStyle = "w-4 h-4 !bg-yellow-500 rounded-full";

interface NodeDataProps {
  data: NodeData;
  toolbarVisible: boolean;
  toolbarPosition: Position;
}

export default function TextUpdaterNode({
  id,
  data,
}: {
  id: string;
  data: NodeData;
}) {
  return (
    <>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
        <div className="flex">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
            😀
          </div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.name}</div>
            <div className="text-gray-500">1234</div>
          </div>
        </div>

        <NodeToolbar className="flex flex-row gap-4">
          <button>删除</button>
          <button>copy</button>
          <button>expand</button>
        </NodeToolbar>

        <Handle
          type="target"
          position={Position.Left}
          className="h-6 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="h-6 !bg-teal-500"
        />
      </div>
    </>
  );
}
