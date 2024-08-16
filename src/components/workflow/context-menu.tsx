export default function ContextMenu({ id, top, left, right, bottom, ...props }: any) {
    return (
        <div style={{ top, left, right, bottom }} className="context-menu" {...props}>
            <p style={{ margin: "0.5em" }}>
                <small>node: {id}</small>
            </p>
            <button>duplicate</button>
            <button>delete</button>
        </div>
    );
};