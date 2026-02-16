import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="flex h-screen bg-cyan-900 flex flex-col pl-20">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-62 flex-shrink-0 bg-gray-800 p-6 shadow-xl text-white" />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
