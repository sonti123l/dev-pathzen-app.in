import { useState } from "react";
import Header from "./core/Header";
import SideBarForProject from "./core/SidebarForProject";
import { Button } from "./ui/button";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import TruncatedItem from "./TruncatedItem";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { sidebarItems } from "~/helpers/constants/sidebarMenu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBarForProject
        isExpanded={sidebarExpanded}
        setIsExpanded={setSidebarExpanded}
      >
        <nav className="flex flex-col gap-1 px-2 pt-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={`w-full h-10 gap-3 px-3 py-2 text-sm font-medium 
                ${sidebarExpanded ? "justify-start" : "justify-center"}
                 ${
                   isActive
                     ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground w-full"
                     : "text-muted-foreground hover:text-foreground"
                 }`}
                onClick={() => navigate({ to: `${item.path}` })}
              >
                {sidebarExpanded ? (
                  <>
                    <item.icon size={22} />
                    <TruncatedItem name={item.name} length={24} />
                  </>
                ) : (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <item.icon size={22} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </Button>
            );
          })}
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
