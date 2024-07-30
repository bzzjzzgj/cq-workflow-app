import WfProperty from "./property";
import WfSidebar from "./sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden flex flex-row">
      <div className="flex-none p-6 w-[20rem]">
        <WfSidebar />
      </div>
      <div className="flex-1 bg-white">{children}</div>
      <div className="flex-none p-6 w-[20rem]">
        <WfProperty />
      </div>
    </div>
  );
}
