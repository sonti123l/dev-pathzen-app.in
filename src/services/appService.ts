import { $fetch } from "~/http/fetch";

export const scheduleMeeting = async (
  id: number,
  payload: { live_time: string; live_date: string },
) => {
  const res = await $fetch.patch(`/course/submodule/${id}/settime`, payload);
  return res;
};

export const createLiveStream = async (
  id: number,
  payload: { role: string; title: string; createdBy: string },
) => {
  const res = await $fetch.post(`/rooms/golive/${id}`, payload);
  return res;
};

export const roomActiveForStudent = async (id: number) => {
  const res = await $fetch.get(`/rooms/active/${id}`);
  return res;
};


export const endLiveStream = async (id: string, payload: {role: string}) => {
  const res = await $fetch.post(`/rooms/end/${id}`, payload);
  return res;
};