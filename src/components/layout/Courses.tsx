import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllCourses } from "~/services/resources/resourceService";

export default function AllCourses() {
  const [coursesList, setCoursesList] = useState([]);
  const {
    data: allCourseDetails,
    isSuccess: successfullyGotAllCourses,
    isError: errorWhileRetrieving,
    isLoading: coursesDetailsAreLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: async () => {
      const res = await getAllCourses();
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (successfullyGotAllCourses) {
      setCoursesList(allCourseDetails);
    }

    if (errorWhileRetrieving) {
      toast.error("Course details are not fetched");
    }
  }, [
    allCourseDetails,
    successfullyGotAllCourses,
    errorWhileRetrieving,
    setCoursesList,
  ]);

  return (
    <>
      {coursesDetailsAreLoading  ? (
        <p></p>
      ) : (
        <div className="flex flex-col h-screen w-full p-2 justify-start items-center">
          <div className="mt-2 flex justify-start w-full p-2">
            <p className="text-xl ">All Courses</p>
          </div>
          <div className="w-full p-6 overflow-y-auto mb-3">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              { coursesList?.length > 0 && coursesList?.map((eachCourse) => (
                <div
                  key={eachCourse.course_id}
                  className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition cursor-pointer"
                >
                  <div className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mb-3">
                    {eachCourse?.domain_name}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {eachCourse?.course_name}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Created on{" "}
                    {new Date(
                      eachCourse?.course_created_at,
                    ).toLocaleDateString()}
                  </p>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
