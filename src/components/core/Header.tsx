import { Button } from "../ui/button";
import ChevronDown from "~/icons/chevron-icon";
import MenuIcon from "~/icons/menu-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LogoutDoorIcon from "~/icons/auth-icons/logout-door-icon";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Input } from "../ui/input";
import SearchIcon from "~/icons/search-icon";
import { useEffect, useState } from "react";
import { getUserFromStorage } from "~/helpers/constants/getUserDetails";
import { userDetailsType } from "~/lib/interfaces/app";
interface HeaderProps {
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setSidebarExpanded }: HeaderProps) {
  const [user, setUser] = useState<userDetailsType>({
    branch_name: "",
    is_user: "",
    student_college_id: 0,
    student_course_id: 0,
    student_email_id: "",
    student_id: 0,
    student_name: "",
    student_roll_no: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();

    Cookies.remove("token");
    Cookies.remove("refresh_token");
    navigate({ to: "/login" });
  };

  useEffect(() => {
    const userDetails = getUserFromStorage();
    console.log(userDetails);
    if (userDetails) {
      setUser(userDetails);
    }
  }, []);

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

      <div className="relative flex justify-center items-center">
        {location?.pathname === "/courses" && (
          <>
            <Input
              type="search"
              placeholder="Search for courses"
              className="w-100 h-10 placeholder:pl-8"
            />

            <SearchIcon className="absolute left-0.5 pl-2 ml-2" />
          </>
        )}
      </div>

      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 text-xs"
            aria-label="User menu"
          >
            <div className="h-6 w-6 rounded-full flex justify-center items-center bg-violet-600 text-white">
              {user?.student_name?.slice(0, 1).toUpperCase()}
            </div>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <div className="w-full flex justify-evenly items-center gap-2">
              <div className="flex justify-start items-center w-46 gap-2 h-10">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white justify-center items-center flex">
                  {user?.student_name.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-base">
                  {user.student_name.slice(0, 1).toUpperCase() +
                    user.student_name.slice(1, user.student_name.length)}
                </p>
              </div>
              <Button
                className="mt-2 bg-transparent text-black"
                onClick={() => handleLogout()}
              >
                <LogoutDoorIcon />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
