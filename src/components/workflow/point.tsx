import { Handle, HandleType, Position } from "@xyflow/react";


export default function Point({ type, position }: { type: HandleType; position: Position }) {
    return (
        <>
            <Handle
                type={type}
                position={position}
                className="h-4 w-4 rounded-full !bg-yellow-500"
            />
        </>
    );
}