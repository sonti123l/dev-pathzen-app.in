import { $fetch } from "~/http/fetch";
import { loginPayload } from "~/lib/interfaces/auth";

export const userLogin = async ({ payload }: { payload: loginPayload }) => {
  try {
    const response = await $fetch.post("/auth/login", payload);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
