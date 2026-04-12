import { useState } from "react";
import CoursesIcon from "~/icons/sidebar-icons/courses-icon";
import ProgressIcon from "~/icons/sidebar-icons/progress-icon";
import CertificateIcon from "~/icons/sidebar-icons/certificates-icon";
import SettingsIcon from "~/icons/sidebar-icons/settings-icon";
import Header from "./core/Header";
import SideBarForProject from "./core/SidebarForProject";
import { Button } from "./ui/button";
import DashboardIcon from "~/icons/sidebar-icons/dashboard-icon";
import { Outlet, useNavigate } from "@tanstack/react-router";

const sidebarItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { name: "All courses", icon: CoursesIcon, path: "/courses" },
  { name: "My progress", icon: ProgressIcon, path: "/progress" },
  { name: "Certifications", icon: CertificateIcon, path: "/certifications" },
  { name: "Settings", icon: SettingsIcon, path: "/settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBarForProject
        isExpanded={sidebarExpanded}
        setIsExpanded={setSidebarExpanded}
      >
        <nav className="flex flex-col gap-1 px-2 pt-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full h-10 gap-3 px-3 py-2 text-sm font-medium 
                ${sidebarExpanded ? "justify-start" : "justify-center"}`}
              onClick={() => navigate({ to: `${item.path}` })}
            >
              <item.icon size={40} />
              {sidebarExpanded && <span>{item.name}</span>}
            </Button>
          ))}
        </nav>
      </SideBarForProject>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setSidebarExpanded={setSidebarExpanded} />
        <div>
          <Outlet />
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
