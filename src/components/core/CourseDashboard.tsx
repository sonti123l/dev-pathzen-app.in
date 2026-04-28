import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getCourseDetailsByCourseId } from "~/services/resources/resourceService";
import { Button } from "../ui/button";
import BackArrowIcon from "~/icons/back-icon";
import CourseDetailSkeleton from "../CourseDetailsSkeletion";
import { useUser } from "~/hooks/user-provider";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChevronRight, Loader, Radio, Timer, X } from "lucide-react";
import {
  roomActiveForStudent,
  scheduleMeeting,
  createLiveStream,
  endLiveStream,
} from "~/services/appService";

export default function CourseDashboard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const [isLive, setIsLive] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  // true once backend confirms a live room exists for this submodule
  const [isRoomLive, setIsRoomLive] = useState(false);

  const [courseDetailsFromApi, setCourseDetailsFromApi] = useState<{
    course: any[];
    domain: any[];
    modules: any[];
  }>({
    course: [],
    domain: [],
    modules: [],
  });
  const [time, setTime] = useState("");
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useUser();
  const [latestModuleData, setLatestModuleData] = useState<any>(null);

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
    queryKey: ["course-details", id],
    queryFn: async () => {
      const res = await getCourseDetailsByCourseId(Number(id));
      return res?.data?.data?.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const { data: roomDetails, isSuccess: liveRoomDetailsSuccessfullyFetched } =
    useQuery({
      queryKey: ["live-details", latestModuleData?.sub_module_id],
      queryFn: async () => {
        const res = await roomActiveForStudent(
          Number(latestModuleData?.sub_module_id),
        );
        return res?.data;
      },
      enabled: !!latestModuleData?.sub_module_id && user?.role === "STUDENT",
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
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
    onError: () => {
      toast.error("Failed to schedule meeting");
    },
  });

  const createLiveMutation = useMutation({
    mutationKey: ["create_live"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: { role: string; title: string; createdBy: string };
    }) => {
      const response = await createLiveStream(id, payload);
      return response?.data;
    },
  });

  const endLiveMutation = useMutation({
    mutationKey: ["end_live"],
    mutationFn: async ({
      roomId,
      payload,
    }: {
      roomId: string;
      payload: { role: string };
    }) => {
      const response = await endLiveStream(roomId, payload);
      return response?.data;
    },
    onSuccess: () => {
      toast.success("Live ended successfully");
    },
    onError: () => {
      toast.error("Failed to end live");
    },
  });

  useEffect(() => {
    if (courseDetailsFetchingSuccessfull && courseDetails) {
      setCourseDetailsFromApi(courseDetails);

      const activeSubModule = courseDetails?.modules
        ?.flatMap((eachModule: any) =>
          eachModule?.sub_modules?.map((eachSubModule: any) => ({
            module_id: eachModule.module_id,
            module_name: eachModule.module_name,
            course_id_for_module: eachModule.course_id_for_module,
            is_module_complete: eachModule.is_module_complete,
            ...eachSubModule,
          })),
        )
        ?.find((eachSubModule: any) => eachSubModule?.is_active === true);

      console.log("[CourseDashboard] activeSubModule found:", activeSubModule);
      setLatestModuleData(activeSubModule ?? null);
    }

    if (errorInCourseDetails) toast.error("Course details are not fetched");
  }, [courseDetails, courseDetailsFetchingSuccessfull, errorInCourseDetails]);

  useEffect(() => {
    if (roomDetails?.success === true && roomDetails?.data?.iframe_url) {
      // Set iframeUrl only ONCE — never update it on subsequent polls.
      // Changing the src or key on every 5s poll remounts the iframe and
      // kills the stream mid-watch for the student.
      // The Cloudflare iframe (iframe.cloudflarestream.com) natively shows
      // a "Waiting for broadcast" screen until the teacher's WebRTC starts.
      setIframeUrl((prev) => prev ?? roomDetails.data.iframe_url);
      setIsRoomLive(true);
    } else {
      // Class ended or no active room
      setIsRoomLive(false);
      if (roomDetails && !roomDetails?.success) {
        setIframeUrl(null);
      }
    }
  }, [roomDetails]);


  const handleScheduling = (subModuleId: number) => {
    const today = new Date();
    const liveDate = today.toISOString().split("T")[0];
    scheduleMeetingMutation.mutateAsync({
      id: subModuleId,
      payload: { live_time: time, live_date: liveDate },
    });
  };

  const handleGoLive = async () => {
    try {
      const payload = {
        role: String(user?.role),
        title: latestModuleData?.sub_module_title,
        createdBy: String(user?.user_name),
      };

      const res = await createLiveMutation.mutateAsync({
        id: latestModuleData?.sub_module_id,
        payload,
      });

      const streamKey = res?.data?.stream_key;
      const newRoomId = res?.data?.room_id;
      setRoomId(newRoomId);

      // get camera and mic
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // show preview to teacher
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // push to Cloudflare via WHIP
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.cloudflare.com:3478" }],
        bundlePolicy: "max-bundle", // CRITICAL for Cloudflare
      });
      pcRef.current = pc;

      // Monitor connection state to detect if it fails after SDP exchange
      pc.addEventListener("iceconnectionstatechange", () => {
        console.log("[CourseDashboard] ICE Connection State:", pc.iceConnectionState);
        if (pc.iceConnectionState === "failed") {
          toast.error("WebRTC connection failed. Please check your network/firewall.");
        }
      });

      // Cloudflare requires sendonly transceivers
      stream.getTracks().forEach((track) => {
        pc.addTransceiver(track, { direction: "sendonly", streams: [stream] });
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // CRITICAL FIX: Wait for ICE candidates to be gathered before sending SDP.
      // If we send it immediately, it has no network info and Cloudflare can't connect back.
      await new Promise<void>((resolve) => {
        if (pc.iceGatheringState === "complete") {
          resolve();
        } else {
          const checkState = () => {
            if (pc.iceGatheringState === "complete") {
              pc.removeEventListener("icegatheringstatechange", checkState);
              resolve();
            }
          };
          pc.addEventListener("icegatheringstatechange", checkState);
          // Wait up to 10 seconds for STUN candidates to be gathered
          setTimeout(() => {
            console.warn("[CourseDashboard] ICE gathering timeout reached!");
            resolve();
          }, 10000);
        }
      });

      const sdpToSend = pc.localDescription?.sdp || offer.sdp;
      console.log("[CourseDashboard] Sending SDP to Cloudflare. Contains candidates?", sdpToSend.includes("a=candidate"));

      const whipRes = await fetch(streamKey, {
        method: "POST",
        headers: { "Content-Type": "application/sdp" },
        body: sdpToSend,
      });

      if (!whipRes.ok) {
        throw new Error(`Failed to publish stream to Cloudflare. Status: ${whipRes.status}`);
      }

      const answerSdp = await whipRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      // wait for Cloudflare to start distributing
      await new Promise((r) => setTimeout(r, 5000));

      setIsLive(true);
      toast.success("You are now live!");
    } catch (err) {
      console.error("[CourseDashboard] handleGoLive error:", err);
      toast.error("Failed to go live");
    }
  };

  const handleEndLive = async () => {
    // stop camera tracks
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // close WebRTC
    pcRef.current?.close();
    pcRef.current = null;

    const payload = { role: String(user?.role) };

    if (roomId) {
      await endLiveMutation.mutateAsync({ roomId, payload });
    }

    setIsLive(false);
    setRoomId(null);
  };

  const isTeacher = user?.role === "TEACHER";
  const isStudent = user?.role === "STUDENT";

  // isClassLive is true when the backend confirms a room is active AND we have
  // an iframe_url AND the iframe hasn't errored (404 from Cloudflare means
  // the teacher's WHIP stream isn't flowing yet — we keep retrying via iframeKey).
  const isClassLive = isRoomLive && !!iframeUrl;

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
              <div className="overflow-y-auto flex-1">
                {courseDetailsFromApi?.modules?.map((eachModule: any) => {
                  const isOpen = !!openModules[eachModule.module_id];
                  return (
                    <div
                      key={eachModule.module_id}
                      className="border-b border-gray-100"
                    >
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
                                <div
                                  className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${eachSubModule.is_active ? "bg-indigo-500" : "bg-gray-200"}`}
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

                                {isTeacher && (
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
                                        Set Live Time
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
              <div className="flex w-full justify-between items-center">
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

                {/* Teacher — Go Live / End Live button */}
                {isTeacher &&
                  (!isLive ? (
                    <Button
                      onClick={handleGoLive}
                      disabled={createLiveMutation.isPending}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-md"
                    >
                      {createLiveMutation.isPending ? (
                        <Loader className="animate-spin w-4 h-4" />
                      ) : (
                        <>
                          <Radio className="w-4 h-4" />
                          Go Live
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEndLive}
                      disabled={endLiveMutation.isPending}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow-md"
                    >
                      {endLiveMutation.isPending ? (
                        <Loader className="animate-spin w-4 h-4" />
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          End Live
                        </>
                      )}
                    </Button>
                  ))}
              </div>

              {/* Video area */}
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative">
                {/* Teacher preview */}
                {isTeacher && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isLive ? "opacity-100" : "opacity-0"}`}
                    />
                    {!isLive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <Radio className="w-10 h-10 text-gray-600" />
                        <p className="text-gray-500 text-sm">
                          Click Go Live to start streaming
                        </p>
                      </div>
                    )}
                    {isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </>
                )}

                {/* Student viewer */}
                {isStudent && (
                  <>
                    {/* iframe.cloudflarestream.com natively shows "Waiting for
                        broadcast" when no video is flowing, then auto-plays when
                        the teacher's WebRTC stream starts. Render it once — never
                        remount it on every poll (that kills the stream mid-watch). */}
                    {isClassLive && iframeUrl && (
                      <iframe
                        src={`${iframeUrl}?autoplay=true`}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    )}

                    {/* LIVE badge */}
                    {isClassLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold pointer-events-none">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}

                    {/* No class / offline / starting */}
                    {!isClassLive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        {roomDetails?.data?.stream_starting ? (
                          <>
                            <Loader className="w-8 h-8 text-gray-500 animate-spin" />
                            <p className="text-gray-400 text-sm font-medium">
                              Class is starting…
                            </p>
                            <p className="text-gray-400 text-xs">
                              Connecting to live stream, please wait
                            </p>
                          </>
                        ) : (
                          <>
                            <Radio className="w-10 h-10 text-gray-600" />
                            <p className="text-gray-500 text-sm">
                              {!latestModuleData
                                ? "No active module assigned"
                                : "No live class right now"}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-700 font-medium">
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
