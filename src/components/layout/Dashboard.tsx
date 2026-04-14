import { userDetails } from "~/helpers/constants/getUserDetails";
import { useQuery } from "@tanstack/react-query";
import { getCourseDetailsByCourseId } from "~/services/resources/resourceService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReactLogo } from "~/icons/react-icon";
import { Button } from "../ui/button";
import CourseCardSkeleton from "../CourseCardSkeleton";

export default function Dashboard() {
  const [courseDetailsFromApi, setCourseDetailsFromApi] = useState({
    course: [],
    domain: [],
  });
  const {
    data: courseDetails,
    isSuccess: courseDetailsFetchingSuccessfull,
    isError: errorInCourseDetails,
    isLoading: courseDetailsAreLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: async () => {
      const res = await getCourseDetailsByCourseId(
        userDetails?.student_course_id,
      );
      return res?.data?.data?.data;
    },
    enabled: !!userDetails?.student_course_id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (courseDetailsFetchingSuccessfull) {
      setCourseDetailsFromApi(courseDetails);
    }

    if (errorInCourseDetails) {
      toast.error("Course details are not fetched");
    }
  }, [
    courseDetails,
    courseDetailsFetchingSuccessfull,
    errorInCourseDetails,
    setCourseDetailsFromApi,
  ]);

  return (
    <div className="w-full flex flex-col justify-start p-2 items-center h-screen bg-slate-100">
      {/* Header */}
      <div className="w-full h-58 m-2 rounded-xl bg-blue-950 flex items-center justify-center">
        <p className="text-xl text-white">
          {`Welcome Back ${userDetails.student_name}`.toUpperCase()}
        </p>
      </div>

      {/* Courses Section */}
      <div className="flex flex-col justify-start w-full mt-3 gap-3">
        <p className="text-2xl">My Courses</p>

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

                                <div className="h-7 w-24 rounded-xl border flex justify-center items-center gap-2">
                                  <div className="bg-red-400 w-3 h-3 rounded-full" />
                                  <p className="text-gray-600 text-sm">
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
                                <Button className="bg-transparent border border-white h-10">
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
