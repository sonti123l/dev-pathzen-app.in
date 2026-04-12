import { ReactNode } from "react";

interface CustomSidebar {
  isExpanded: boolean;
  children?: ReactNode;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  footer?: ReactNode;
}

export default function SideBarForProject({
  isExpanded,
  children,
  footer,
}: CustomSidebar) {
  return (
    <aside
      className={`
        flex flex-col h-full shrink-0 border-r
        transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? "w-56" : "w-14"}
      `}
    >
      <div className={`flex items-center gap-3 px-3 h-14 shrink-0 border-b ${!isExpanded && "justify-center"}`}>
        <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {isExpanded && (
          <div className="flex flex-col gap-1 leading-tight">
            <span className="text-lg font-bold tracking-tight text-black">PathZen</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">
              Learn · Build · Grow
            </span>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </nav>

      {footer && (
        <div className="border-t p-2 shrink-0">
          {footer}
        </div>
      )}
    </aside>
  );
}