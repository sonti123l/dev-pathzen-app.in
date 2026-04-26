import { $fetch } from "~/http/fetch";

export const scheduleMeeting = async (
  id: number,
  payload: { live_time: string },
) => {
  try {
    const res = await $fetch.patch(`/course/submodule/${id}/settime`, payload);
    return res;
  } catch (error) {
    throw error;
  }
};
