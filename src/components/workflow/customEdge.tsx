import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSimpleBezierPath,
  getStraightPath,
  Position,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [path, labelX, labelY, offsetX, offsetY] = getSimpleBezierPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: Position.Right,
    targetX: targetX,
    targetY: targetY,
    targetPosition: Position.Left,
  });

  return (
    <>
      <BaseEdge id={id} path={path} className="animated" />
      
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan animated"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
