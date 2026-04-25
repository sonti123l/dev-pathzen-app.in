import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCourseDetailsByCourseId } from "~/services/resources/resourceService";
import { Button } from "../ui/button";
import BackArrowIcon from "~/icons/back-icon";
import CourseDetailSkeleton from "../CourseDetailsSkeletion";
import { useUser } from "~/hooks/user-provider";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Timer } from "lucide-react";
import { scheduleMeeting } from "~/services/appService";

export default function CourseDashboard() {
  const [courseDetailsFromApi, setCourseDetailsFromApi] = useState({
    course: [],
    domain: [],
    modules: [],
  });
  const [time, setTime] = useState("");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const { user } = useUser();

  const { id } = useParams({ strict: false });
  const router = useRouter();

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const {
    data: courseDetails,
    isSuccess: courseDetailsFetchingSuccessfull,
    isError: errorInCourseDetails,
    isLoading: courseDetailsAreLoading,
  } = useQuery({
    queryKey: ["course-details"],
    queryFn: async () => {
      const res = await getCourseDetailsByCourseId(Number(id));
      return res?.data?.data?.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const scheduleMeetingMutation = useMutation({
    mutationKey: ["course_details_update"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: { live_time: string };
    }) => {
      const response = await scheduleMeeting(id, payload);
      return response?.data;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.success_message);
    },
    onError: (error) => {
      toast.error("Failed to schedule meeting");
    },
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

  const handleScheduling = (id: number) => {
    const payload = {
      live_time: time,
    };

    scheduleMeetingMutation.mutateAsync({ id, payload });
  };

  return (
    <>
      {courseDetailsAreLoading ? (
        <CourseDetailSkeleton />
      ) : (
        <div className="w-full h-screen flex flex-col bg-gray-50">
          {/* Top bar */}
          <div className="flex items-center gap-4 px-5 h-14 bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
            <Button
              onClick={() => router.history.back()}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 p-0"
            >
              <BackArrowIcon className="w-4 h-4 text-gray-700" />
            </Button>

            <p className="font-medium text-[15px] text-gray-900 flex-1 truncate">
              {courseDetailsFromApi?.course?.[0]?.course_name}
            </p>

            {/* Progress indicator */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-xs text-gray-500">Progress</span>
              <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: "38%" }}
                />
              </div>
              <span className="text-xs font-medium text-emerald-700">38%</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  Course Overview
                </p>
              </div>

              {/* Sidebar scroll area */}
              <div className="overflow-y-auto flex-1 py-2">
                {courseDetailsFromApi?.modules?.map((eachModule: any) => {
                  const isOpen = !!openModules[eachModule.module_id];

                  return (
                    <div key={eachModule.module_id} className="mb-0.5">
                      {/* Module row */}
                      <div
                        onClick={() => toggleModule(eachModule.module_id)}
                        className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3.5 h-3.5 text-emerald-700"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M2 3h12M2 8h8M2 13h5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-gray-800 flex-1 leading-snug">
                          {eachModule?.module_name}
                        </span>

                        {/* Rotating chevron */}
                        <svg
                          className={`w-3 h-3 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : "rotate-0"
                          }`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M4 2l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Sub-modules — only shown when open */}
                      {isOpen && (
                        <div>
                          {eachModule?.sub_modules?.map(
                            (eachSubModule: any) => (
                              <div
                                key={eachSubModule.sub_module_id}
                                className="flex items-center gap-2 pl-[54px] pr-4 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                                <div className="flex justify-between w-full items-center">
                                  <span className="text-[12px] text-gray-500 leading-snug">
                                    {eachSubModule.sub_module_title}
                                  </span>
                                  {user?.role === "TEACHER" && (
                                    <div>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="icon">
                                            <Timer className="w-3 h-3" />
                                          </Button>
                                        </DialogTrigger>

                                        <DialogContent className="text-center space-y-4">
                                          <h2 className="text-lg font-semibold">
                                            Set Timer
                                          </h2>

                                          <Input
                                            type="time"
                                            value={time}
                                            onChange={(e) =>
                                              setTime(e.target.value)
                                            }
                                          />

                                          <div className="text-sm text-muted-foreground">
                                            Selected Time: {time || "Not set"}
                                          </div>

                                          <Button
                                            className="w-full"
                                            onClick={() =>
                                              handleScheduling(
                                                eachSubModule.sub_module_id,
                                              )
                                            }
                                          >
                                            Schedule Live
                                          </Button>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">
              {/* Stats row */}
              <div className="flex gap-3">
                {[
                  { label: "Completed", value: "3 / 9", green: true },
                  { label: "Time spent", value: "1h 24m" },
                  { label: "Est. remaining", value: "2h 10m" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 bg-white rounded-xl border border-gray-100 px-3.5 py-3"
                  >
                    <p className="text-[11px] text-gray-400 mb-1">{s.label}</p>
                    <p
                      className={`text-lg font-medium ${s.green ? "text-emerald-600" : "text-gray-800"}`}
                    >
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Lesson card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-medium px-2.5 py-1 rounded-full mb-3">
                  Module 1 · Lesson 3
                </span>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Current lesson title
                </h2>
                <div className="flex gap-4 text-[12px] text-gray-400 mb-4">
                  <span>12 min</span>
                  <span>Video + Reading</span>
                </div>
                <div className="h-px bg-gray-100 mb-4" />
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Lesson description goes here.
                </p>
                <button className="mt-5 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors">
                  Next lesson →
                </button>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
