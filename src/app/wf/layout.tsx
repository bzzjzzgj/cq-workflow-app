import { ReactFlowProvider } from "@xyflow/react";
import WfProperty from "./property";
import WfSidebar from "./sidebar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactFlowProvider>
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-none p-6 w-[20rem] shadow-md border-r">
          <WfSidebar />
        </div>
        <div className="flex-1 bg-white">{children}</div>
        <div className="flex-none p-6 w-[20rem]">
          <WfProperty />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
