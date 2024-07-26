"use client";

export default function Example() {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    console.log("Drop", data);
  };

  const handleDragOver = (e) => {
    // 允许拖拽元素进入这个区域
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      className="h-screen"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    ></div>
  );
}
