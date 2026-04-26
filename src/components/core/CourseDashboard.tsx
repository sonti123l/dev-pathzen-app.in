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
import { ChevronRight, Loader, Timer } from "lucide-react";
import { scheduleMeeting } from "~/services/appService";

export default function CourseDashboard() {
  const [courseDetailsFromApi, setCourseDetailsFromApi] = useState({
    course: [],
    domain: [],
    modules: [],
  });
  const [time, setTime] = useState("");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const [latestModuleData, setLatestModuleData] = useState({});

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
      payload: { live_time: string; live_date: string };
    }) => {
      const response = await scheduleMeeting(id, payload);
      return response?.data;
    },
    onSuccess: (data) => {
      setDialogOpen(false);
      setTime("");
      toast.success(data?.data?.message);
    },
    onError: (error) => {
      toast.error("Failed to schedule meeting");
    },
  });

  useEffect(() => {
    if (courseDetailsFetchingSuccessfull) {
      setCourseDetailsFromApi(courseDetails);
      const activeSubModule = courseDetails?.modules
        ?.flatMap((eachModule) =>
          eachModule?.sub_modules?.map((eachSubModule) => ({
            module_id: eachModule.module_id,
            module_name: eachModule.module_name,
            course_id_for_module: eachModule.course_id_for_module,
            is_module_complete: eachModule.is_module_complete,
            ...eachSubModule,
          })),
        )
        ?.find((eachSubModule) => eachSubModule?.is_active === true);

      setLatestModuleData(activeSubModule);
    }

    if (errorInCourseDetails) {
      toast.error("Course details are not fetched");
    }
  }, [
    courseDetails,
    courseDetailsFetchingSuccessfull,
    errorInCourseDetails,
    setCourseDetailsFromApi,
    setLatestModuleData,
  ]);

  const handleScheduling = (id: number) => {
    const today = new Date();

    const liveDate = today.toISOString().split("T")[0];
    const payload = {
      live_time: time,
      live_date: liveDate,
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
              <div className="overflow-y-auto flex-1">
                {courseDetailsFromApi?.modules?.map((eachModule: any) => {
                  const isOpen = !!openModules[eachModule.module_id];

                  return (
                    <div
                      key={eachModule.module_id}
                      className="border-b border-gray-100"
                    >
                      {/* Module row */}
                      <div
                        onClick={() => toggleModule(eachModule.module_id)}
                        className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-indigo-600"
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
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] font-medium text-gray-900 leading-snug block">
                            {eachModule?.module_name}
                          </span>
                          <span className="text-[11px] text-gray-400 mt-0.5 block">
                            Foundation
                          </span>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
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

                      {/* Sub-modules */}
                      {isOpen && (
                        <div className="pb-2">
                          {eachModule?.sub_modules?.map(
                            (eachSubModule: any) => (
                              <div
                                key={eachSubModule.sub_module_id}
                                className={`flex items-center gap-3 pl-4 pr-4 py-2.5 transition-colors
                  ${
                    eachSubModule.is_active
                      ? "cursor-pointer hover:bg-gray-50"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                  }`}
                              >
                                {/* Check icon */}
                                <div
                                  className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0
                  ${eachSubModule.is_active ? "bg-indigo-500" : "bg-gray-200"}`}
                                >
                                  <svg
                                    className="w-3.5 h-3.5 text-white"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <path
                                      d="M2 6l3 3 5-5"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] text-gray-700 leading-snug">
                                    {eachSubModule.sub_module_title}
                                  </p>
                                </div>

                                {user?.role === "TEACHER" && (
                                  <Dialog
                                    open={dialogOpen}
                                    onOpenChange={setDialogOpen}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-7 h-7 rounded-lg border-gray-200 flex-shrink-0"
                                        disabled={!eachSubModule.is_active}
                                        onClick={() => setDialogOpen(true)}
                                      >
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
                                        disabled={
                                          scheduleMeetingMutation?.isPending
                                        }
                                      >
                                        {scheduleMeetingMutation?.isPending ? (
                                          <Loader className="animate-spin" />
                                        ) : (
                                          "Schedule Live"
                                        )}
                                      </Button>
                                    </DialogContent>
                                  </Dialog>
                                )}
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
              <div className="flex w-full justify-start items-center">
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="text-gray-400">Course Overview</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500">
                    {latestModuleData?.module_name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-800 font-medium">
                    {latestModuleData?.sub_module_title}
                  </span>
                </p>
              </div>

              {/* only for video */}
              <div className="w-full h-130 border "></div>

              {/* that sub module */}

              <div>
                <p>
                  {courseDetailsFromApi?.course?.[0]?.course_name}:{" "}
                  {latestModuleData?.sub_module_title}
                </p>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
