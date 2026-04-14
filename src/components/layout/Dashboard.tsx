import { userDetails } from "~/helpers/constants/getUserDetails";

export default function Dashboard(){


    return(
        <div className="w-full flex flex-col justify-start items-center h-screen p-2 bg-slate-100">
            <div className="w-full h-58 m-2 rounded-xl bg-blue-950">
                <p className="text-xl text-white">{`Welcome Back ${userDetails.student_name}`.toUpperCase()}</p>
            </div>

            <div>
                
            </div>
        </div>
    )
}