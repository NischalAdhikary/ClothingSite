import Navbar from "@/components/layers/Navbar";

import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
