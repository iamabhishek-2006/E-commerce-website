import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import useAppStore from "@/store/app.Store";

const Sidebar = () => {
  const { sidebar, closeSidebar } = useAppStore();


  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        sidebar ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-500/55 transition-opacity duration-300 ${
          sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed h-screen left-0 shadow-lg transform transition-transform duration-300 
        ${sidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Gradient Background */}
        <div className="bg-gradient-to-b from-blue-600 to-purple-600 text-white w-[250px] h-full py-4">
          {/* Header */}
          <div className="flex justify-between items-center px-4">
            <h1 className="text-lg font-bold">Hi, User</h1>
            <X
              className="text-2xl cursor-pointer hover:text-red-300 transition"
              onClick={closeSidebar}
            />
          </div>

          {/* Separator */}
          <Separator className="my-4 bg-white/40" />

          {/* Content */}
          <div className="px-4 space-y-3">
            <p className="hover:bg-white/20 p-2 rounded-md cursor-pointer transition">
              Dashboard
            </p>
            <p className="hover:bg-white/20 p-2 rounded-md cursor-pointer transition">
              Products
            </p>
            <p className="hover:bg-white/20 p-2 rounded-md cursor-pointer transition">
              Orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;