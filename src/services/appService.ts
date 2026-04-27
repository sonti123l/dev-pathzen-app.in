import { $fetch } from "~/http/fetch";

export const scheduleMeeting = async (
  id: number,
  payload: { live_time: string; live_date: string },
) => {
  try {
    const res = await $fetch.patch(`/course/submodule/${id}/settime`, payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const createLiveStream = async (
  id: number,
  payload: { role: string; title: string; createdBy: string },
) => {
  try {
    const res = await $fetch.post(`/rooms/golive/${id}`, payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const roomActiveForStudent = async (id: number) => {
  try {
    const res = await $fetch.get(`/rooms/active/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};


export const endLiveStream = async (id: string) => {
  try {
    const res = await $fetch.get(`/rooms/end/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};