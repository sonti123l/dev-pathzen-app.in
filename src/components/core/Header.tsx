import { MenuIcon } from "~/icons/menu-icon";
import { Button } from "../ui/button";
import ChevronDown from "~/icons/chevron-icon";

export default function Header(){
    return(
        <div className="flex w-full justify-between items-center h-8 border shadow-black">
            <div className="pl-2">
                <MenuIcon/>
            </div>
            <div className="w-10 pr-2 ">
                <Button className= "w-full h-9.5 bg-transparent border">
                    <div>

                    </div>
                    <ChevronDown/>
                </Button>
            </div>
        </div>
    )
}