import { useQuery } from "@tanstack/react-query";
import { getCourseDetailsByCourseId } from "~/services/resources/resourceService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReactLogo } from "~/icons/react-icon";
import { Button } from "../ui/button";
import CourseCardSkeleton from "../CourseCardSkeleton";
import getDayAccordingToTime from "~/helpers/constants/getDateAndTimeAccordingly";
import { useNavigate } from "@tanstack/react-router";
import { userDetailsType } from "~/lib/interfaces/app";
import { getUserFromStorage } from "~/helpers/constants/getUserDetails";

export default function Dashboard() {
  const [courseDetailsFromApi, setCourseDetailsFromApi] = useState({
    course: [],
    domain: [],
  });

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
  const getDayString = getDayAccordingToTime();
  const {
    data: courseDetails,
    isSuccess: courseDetailsFetchingSuccessfull,
    isError: errorInCourseDetails,
    isLoading: courseDetailsAreLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: async () => {
      const res = await getCourseDetailsByCourseId(
        user?.student_course_id,
      );
      return res?.data?.data?.data;
    },
    enabled: !!user?.student_course_id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const userDetails = getUserFromStorage();
    if (courseDetailsFetchingSuccessfull) {
      setCourseDetailsFromApi(courseDetails);
    }

    if (errorInCourseDetails) {
      toast.error("Course details are not fetched");
    }

    if (userDetails) {
      setUser(userDetails);
    }
  }, [
    courseDetails,
    courseDetailsFetchingSuccessfull,
    errorInCourseDetails,
    setCourseDetailsFromApi,
    setUser,
  ]);

  return (
    <div className="w-full flex flex-col justify-start p-5 items-center h-screen bg-slate-100 overflow-y-auto">
      <div
        className="w-full rounded-3xl p-8 flex justify-between items-center 
bg-linear-to-r from-indigo-900 via-purple-900 to-blue-900 shadow-lg"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/55 m-0">
              WELCOME BACK
            </p>

            <h1 className="text-[28px] font-extrabold tracking-tight text-white leading-[1.15] mt-1.5 mb-2">
              {`${getDayString}, ${user?.student_name}`}
            </h1>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-2">
            <Button
              className="inline-flex h-11 items-center gap-2 bg-[#6C63FF] hover:bg-[#5b52ee] text-white text-[14px] font-semibold px-5 py-2.75 rounded-[10px] tracking-[0.01em] transition-colors cursor-pointer border-none"
              onClick={() =>
                navigate({ to: `/course/${user.student_course_id}` })
              }
            >
              ▶ Continue Learning
            </Button>
            <Button
              className="inline-flex h-11 items-center bg-white/8 hover:bg-white/15 text-white text-[14px] font-semibold px-5 py-2.75 rounded-[10px] border border-white/15 tracking-[0.01em] transition-colors cursor-pointer"
              onClick={() => navigate({ to: "/courses" })}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="flex flex-col justify-start w-full mt-3 gap-3">
        <p className="text-2xl font-medium">Continue Learning</p>

        {/* Domains */}
        <div className="flex justify-start items-center">
          {courseDetailsAreLoading ? (
            <CourseCardSkeleton />
          ) : (
            <>
              {courseDetailsFromApi?.domain?.map(
                (eachDomain: { domain_id: number; domain_name: string }) => {
                  const domainId = eachDomain.domain_id;

                  return (
                    <div key={domainId} className="flex flex-wrap gap-4">
                      {courseDetailsFromApi?.course
                        ?.filter(
                          (eachCourseDetail) =>
                            eachCourseDetail?.field_id === domainId,
                        )
                        .map((eachCourseDetail) => (
                          <div
                            key={eachCourseDetail.course_id}
                            className="w-100 border-2 h-64 rounded-xl flex flex-col justify-start bg-white shadow"
                          >
                            {/* Top Section */}
                            <div className="flex flex-col justify-start items-center p-3 w-full h-32 rounded-t-xl bg-green-100">
                              <div className="flex justify-between items-center w-full">
                                <p className="text-sm font-semibold">
                                  {eachDomain.domain_name}
                                </p>

                                <div className="h-7 w-24 rounded-xl border flex justify-center items-center gap-2 border-yellow-300">
                                  <p className="text-yellow-600 text-sm">
                                    In Progress
                                  </p>
                                </div>
                              </div>

                              <div className="w-full flex justify-center items-center h-12 mt-4">
                                <ReactLogo className="w-9 h-9 text-gray-700" />
                              </div>
                            </div>

                            <div className="h-32 bg-gray-900 rounded-b-lg p-2 flex flex-col justify-between gap-3">
                              <p className="text-base text-gray-200">
                                {eachCourseDetail.course_name}
                              </p>

                              <div className="w-full flex justify-end p-2">
                                <Button
                                  className="bg-transparent border border-white h-10"
                                  onClick={() =>
                                    navigate({
                                      to: `/course/${user.student_course_id}`,
                                    })
                                  }
                                >
                                  Continue
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                },
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
