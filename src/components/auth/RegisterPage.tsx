import ProfileIcon from "~/icons/auth-icons/profile-icon";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "~/services/auth/resourceService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  branchName: string;
  collegeId: number;
  domain: string;
  rollNo: string;
  courseId: number;
}

export default function RegisterPage() {
  const [registrationFormData, setRegistrationFormData] =
    useState<RegisterFormType>({
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
      branchName: "",
      collegeId: 0,
      domain: "",
      rollNo: "",
      courseId: 0,
    });

  const [collegeListData, setCollegeListData] = useState([]);

  const {
    data: collegesList,
    isSuccess: isGetCollegesSuccess,
    isError: isGetCollegesGotError,
    isLoading: isCollegesListLoading,
  } = useQuery({
    queryKey: ["colleges-list"],
    queryFn: async () => {
      const res = await getColleges();
      return res?.data;
    },
  });

  if (isGetCollegesSuccess) {
    setCollegeListData(collegesList?.data?.data);
  }

  const handleSubmit = async () => {
    console.log("came here");
  };

  console.log(collegeListData?.length, collegeListData?.[0]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-105 min-h-screen bg-blue-600 p-12 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl">✦</span>
          <span className="text-white font-semibold text-lg tracking-wide">
            PathZen
          </span>
        </div>
        <div>
          <p className="text-blue-100 text-3xl font-light leading-snug">
            Learning that adapts <br />
            <span className="text-white font-semibold">to you.</span>
          </p>
          <p className="text-blue-200 text-sm mt-4 leading-relaxed">
            Your personalized path to knowledge starts here.
          </p>
        </div>
        <p className="text-blue-300 text-xs">
          © 2025 PathZen. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 justify-center items-center bg-white px-8">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="flex justify-center items-center gap-2">
            <ProfileIcon className="w-6 h-6" />
            <p className="text-black text-lg">Register</p>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              {/* First section */}
              <div>
                <div>
                  <label>Name</label>
                  <Input
                    value={registrationFormData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    value={registrationFormData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Second section */}
              <div>
                <div>
                  <label>Password</label>
                  <Input
                    value={registrationFormData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Verify Password</label>
                  <Input
                    value={registrationFormData.verifyPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        verifyPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Third section */}
              <div>
                <div>
                  <label>Branch Name</label>
                  <Input
                    value={registrationFormData.branchName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        branchName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>College Name</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Input placeholder="Select college" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {collegeListData?.length > 0 &&
                       collegeListData?.map((eachRecord) => (
                          <div>
                            {eachRecord?.college_name}
                          </div>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
