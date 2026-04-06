import { $fetch } from "~/http/fetch";
import { loginPayload } from "~/lib/interfaces/auth";

export const userLogin = async ({ payload }: { payload: loginPayload }) => {
  const response = await $fetch.post("/auth/login", payload);
  return response;
};
