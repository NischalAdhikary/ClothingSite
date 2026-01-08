import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const items = [
  {
    title: "dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "product",
    url: "/admin/dashboard/product",
    icon: Inbox,
  },
  {
    title: "customers",
    url: "#",
    icon: Calendar,
  },
  {
    title: "order",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AdminLayout() {
  return (
    <SidebarProvider className="w-full min-h-screen">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <h3 className="text-lg ">Dashboard</h3>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex flex-col w-full relative ">
        <SidebarTrigger className="h-10  " />
        <div className="w-full flex-1 h-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
