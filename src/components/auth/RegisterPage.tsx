import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getColleges,
  getCoursesByDomainId,
  getDomains,
} from "~/services/resources/resourceService";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  RegisterFormType,
  CollegeData,
  DomainsDataType,
  CoursesDataType,
} from "~/lib/interfaces/app";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterPage() {
  const [registrationFormData, setRegistrationFormData] =
    useState<RegisterFormType>({
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
      branchName: "",
      collegeId: 0,
      domainId: 0,
      rollNo: "",
      courseId: 0,
    });

  const navigate = useNavigate();
  // Colleges
  const [collegeListData, setCollegeListData] = useState<CollegeData[]>([]);
  const [collegesDataLoading, setCollegesDataLoading] = useState(false);

  // domains
  const [domainsData, setDomainsData] = useState<DomainsDataType[]>([]);
  const [loadingDomains, setLoadingDomains] = useState(false);

  // courses
  const [coursesData, setCoursesData] = useState<CoursesDataType[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // Colleges List
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
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Domains list
  const {
    data: domainsList,
    isSuccess: isDomainSuccessfullyRetrieved,
    isError: domainError,
    isLoading: loadingDomainsFromApi,
  } = useQuery({
    queryKey: ["domains-list"],
    queryFn: async () => {
      const res = await getDomains();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // courses List from domainId
  const {
    data: coursesList,
    isSuccess: coursesListFromDomainIdIsSuccessFullOrNot,
    isError: coursesDataError,
    isLoading: loadingCoursesData,
  } = useQuery({
    queryKey: ["courses-list"],
    queryFn: async () => {
      const res = await getCoursesByDomainId(registrationFormData?.domainId);
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!registrationFormData?.domainId,
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("came here");
  };

  // useEffect for domains to prevent re-renders
  useEffect(() => {
    if (isDomainSuccessfullyRetrieved) {
      setLoadingDomains(false);
      setDomainsData(domainsList?.data?.data);
    } else if (domainError) {
      toast.error("request failed data not retrieved");
    }

    if (loadingDomainsFromApi) setLoadingDomains(true);
  }, [
    isDomainSuccessfullyRetrieved,
    domainError,
    loadingDomainsFromApi,
    setLoadingDomains,
  ]);

  // useEffect for colleges to prevent re-renders
  useEffect(() => {
    if (isGetCollegesSuccess) {
      setCollegesDataLoading(false);
      setCollegeListData(collegesList?.data?.data);
    } else if (isGetCollegesGotError) {
      toast.error("request failed data not retrieved");
    }

    if (isCollegesListLoading) setCollegesDataLoading(true);
  }, [
    isGetCollegesSuccess,
    isGetCollegesGotError,
    isCollegesListLoading,
    setCollegesDataLoading,
  ]);

  // useEffect for courses to prevent re-renders
  useEffect(() => {
    if (coursesListFromDomainIdIsSuccessFullOrNot) {
      setLoadingCourses(false);
      setCoursesData(coursesList?.data?.data);
    } else if (coursesDataError) {
      toast.error("request failed data not retrieved");
    }

    if (loadingCoursesData) setLoadingCourses(true);
  }, [
    coursesListFromDomainIdIsSuccessFullOrNot,
    coursesDataError,
    loadingCoursesData,
    setLoadingCourses,
  ]);

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
      <div className="flex flex-1 justify-center items-center bg-white px-8 py-12">
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-center items-center gap-2 mb-2">
            {/* <ProfileIcon className="w-6 h-6 text-blue-600" /> */}
            <p className="text-gray-900 text-xl font-semibold">Register</p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* First section - Name & Email */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Name
                  </label>
                  <Input
                    value={registrationFormData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Email
                  </label>
                  <Input
                    value={registrationFormData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Second section - Password & Verify Password */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={registrationFormData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Verify Password
                  </label>
                  <Input
                    type="password"
                    value={registrationFormData.verifyPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        verifyPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Third section - Branch Name & College Name */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Branch Name
                  </label>
                  <Input
                    value={registrationFormData.branchName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        branchName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter branch name"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    College Name
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        collegeId: Number(value),
                      })
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      {collegesDataLoading ? (
                        <Loader />
                      ) : (
                        collegeListData?.length > 0 &&
                        collegeListData?.map((eachRecord) => (
                          <SelectItem
                            key={eachRecord?.college_id}
                            value={String(eachRecord?.college_id)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          >
                            {eachRecord?.college_name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fourth section - Field of Interest & Roll Number */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Field of Interest
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        domainId: Number(value),
                      })
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      {loadingDomains ? (
                        <Loader />
                      ) : (
                        domainsData?.length > 0 &&
                        domainsData?.map((eachRecord) => (
                          <SelectItem
                            key={eachRecord?.domain_id}
                            value={String(eachRecord?.domain_id)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          >
                            {eachRecord?.domain_name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Roll Number
                  </label>
                  <Input
                    value={registrationFormData.rollNo}
                    onChange={(e) =>
                      setRegistrationFormData({
                        ...registrationFormData,
                        rollNo: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter roll number"
                  />
                </div>
              </div>

              {/* Fifth section - Courses (Full Width) */}
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Courses
                </label>
                <Select
                  onValueChange={(value) =>
                    setRegistrationFormData({
                      ...registrationFormData,
                      courseId: Number(value),
                    })
                  }
                >
                  <SelectTrigger className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    {loadingCourses ? (
                      <Loader />
                    ) : (
                      coursesData?.length > 0 &&
                      coursesData?.map((eachRecord) => (
                        <SelectItem
                          key={eachRecord?.course_id}
                          value={String(eachRecord?.course_id)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        >
                          {eachRecord?.course_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>Already have an account?</span>

              <Button
                variant="ghost"
                className="p-0 h-auto text-blue-600 font-medium hover:text-blue-700 hover:bg-transparent underline-offset-4 hover:underline transition-all duration-200"
                onClick={() => navigate({to: "/login"}) }
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
