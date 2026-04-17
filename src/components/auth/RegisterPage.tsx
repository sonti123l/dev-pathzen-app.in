import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  RegisterErrorMessage,
} from "~/lib/interfaces/app";
import { useNavigate } from "@tanstack/react-router";
import { registerPayload } from "~/lib/interfaces/auth";
import { registerUser } from "~/services/auth/authService";
import TruncatedItem from "../TruncatedItem";

export default function RegisterPage() {
  const queryClient = useQueryClient();
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

  // registration errors message
  const [errorMessages, setErrorMessages] = useState<RegisterErrorMessage>({
    name: "",
    email: "",
    password: "",
    branch_name: "",
    college_id: "",
    domain_id: "",
    roll_no: "",
    course_id: "",
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

  // Api to register user
  const registerNewUser = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (payload: registerPayload) => {
      const response = await registerUser({ payload });
      return response?.data;
    },
    onSuccess: (data) => {
      console.log(data);
      console.log("user is created")
      toast.success(data.data.success_message);
    },
    onError: (error) => {
      if (error?.status === 422) {
        const errors = error?.data.data;
        const nameError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "name",
        )?.[0];

        const emailError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "email",
        )?.[0];
        const passwordError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "password",
        )?.[0];
        const branchNameError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "branch_name",
        )?.[0];
        const collegeIdError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "college_id",
        )?.[0];
        const domainIdError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "domain_id",
        )?.[0];
        const rollNoError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "roll_no",
        )?.[0];
        const courseIdError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "course_id",
        )?.[0];

        setErrorMessages((prev) => ({
          ...prev,
          name: nameError?.message,
          email: emailError?.message,
          password: passwordError?.message,
          branch_name: branchNameError?.message,
          college_id: collegeIdError?.message,
          domain_id: domainIdError?.message,
          roll_no: rollNoError?.message,
          course_id: courseIdError?.message,
        }));
      }
    },
  });
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload = {
      name: registrationFormData.name.trim(),
      email: registrationFormData.email.trim(),
      password: registrationFormData.password.trim(),
      branchName: registrationFormData.branchName.trim(),
      collegeId: registrationFormData.collegeId,
      domainId: registrationFormData.domainId,
      rollNo: registrationFormData.rollNo.trim(),
      courseId: registrationFormData.courseId,
    };

    await registerNewUser.mutateAsync(payload);
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

    if (registrationFormData?.domainId) {
      setRegistrationFormData({ ...registrationFormData, courseId: 0 });
      queryClient.invalidateQueries({ queryKey: ["courses-list"] });
    }
  }, [
    isDomainSuccessfullyRetrieved,
    domainError,
    loadingDomainsFromApi,
    setLoadingDomains,
    registrationFormData?.domainId,
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
    coursesList,
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

      {/* Right panel - scrollable */}
      <div className="flex flex-1 justify-center items-start bg-white overflow-y-auto mt-10">
        <div className="w-full max-w-2xl flex flex-col gap-6 px-10 py-10">
          {/* Header */}
          <div className="flex flex-col gap-1 mb-1">
            <p className="text-gray-900 text-2xl font-bold">Create account</p>
            <p className="text-gray-400 text-sm">Sign up to start learning</p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* First section - Name & Email */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                  {errorMessages?.name && !registrationFormData?.name ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                  {errorMessages?.email && !registrationFormData?.email ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Second section - Password & Verify Password */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  {errorMessages?.password &&
                  !registrationFormData?.password ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  {registrationFormData.password !==
                  registrationFormData.verifyPassword ? (
                    <p className="text-red-500 text-xs">
                      Password not matching
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Third section - Branch Name & College Name */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter branch name"
                  />
                  {errorMessages?.branch_name &&
                  !registrationFormData?.branchName ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.branch_name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    <SelectTrigger className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all">
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#e0e8f7] rounded-xl shadow-lg">
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
                            <TruncatedItem
                              name={eachRecord?.college_name}
                              length={24}
                            />
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errorMessages?.college_id &&
                  !registrationFormData?.collegeId ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.college_id}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Fourth section - Field of Interest & Roll Number */}
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    <SelectTrigger className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#e0e8f7] rounded-xl shadow-lg">
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
                            <TruncatedItem
                              name={eachRecord?.domain_name}
                              length={24}
                            />
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errorMessages?.domain_id &&
                  !registrationFormData?.domainId ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.domain_id}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                    className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 placeholder-[#b0bbd4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter roll number"
                  />
                  {errorMessages?.roll_no && !registrationFormData?.rollNo ? (
                    <p className="text-red-500 text-xs">
                      {errorMessages?.roll_no}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Fifth section - Courses (Full Width) */}
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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
                  <SelectTrigger className="w-full px-4 py-3 bg-[#f3f6fd] border border-[#e0e8f7] rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#e0e8f7] rounded-xl shadow-lg">
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
                          <TruncatedItem
                            name={eachRecord?.course_name}
                            length={50}
                          />
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errorMessages?.course_id && !registrationFormData?.courseId ? (
                  <p className="text-red-500 text-xs">
                    {errorMessages?.course_id}
                  </p>
                ) : (
                  ""
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#3b6cf4] hover:bg-[#2251d1] text-white font-bold rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-2"
                disabled={registerNewUser.isPending}
              >
                {registerNewUser.isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Already have an account?</span>
              <Button
                variant="ghost"
                className="p-0 h-auto text-blue-500 font-semibold hover:text-blue-600 hover:bg-transparent underline-offset-4 hover:underline transition-all duration-200"
                onClick={() => navigate({ to: "/login" })}
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
