import { Button } from "../ui/button";
import ChevronDown from "~/icons/chevron-icon";
import MenuIcon from "~/icons/menu-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { userDetails } from "~/helpers/constants/getUserDetails";
import LogoutDoorIcon from "~/icons/auth-icons/logout-door-icon";
import Cookies from "js-cookie";
import { useNavigate } from "@tanstack/react-router";
interface HeaderProps {
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setSidebarExpanded }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between h-14 px-3 border-b shrink-0 bg-slate-100 z-10 w-full">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setSidebarExpanded((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 text-xs"
            aria-label="User menu"
          >
            <div className="h-6 w-6 rounded-full flex justify-center items-center bg-violet-600 text-white">
              {userDetails?.student_name.slice(0, 1).toUpperCase()}
            </div>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <div className="w-full flex justify-evenly items-center gap-2">
              <div className="flex justify-start items-center w-46 gap-2 h-10">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white justify-center items-center flex">
                  {userDetails?.student_name.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-base">
                  {userDetails.student_name.slice(0, 1).toUpperCase() +
                    userDetails.student_name.slice(
                      1,
                      userDetails.student_name.length,
                    )}
                </p>
              </div>
              <Button className="mt-2 bg-transparent text-black" onClick={() => {
                localStorage.clearAll();
                Cookies.remove("token");
                navigate({to: "/login"});
                }}>
                <LogoutDoorIcon />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
