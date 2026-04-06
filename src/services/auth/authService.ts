import { $fetch } from "~/http/fetch";
import { loginPayload } from "~/lib/interfaces/auth";

export const userLogin = async ({ payload }: { payload: loginPayload }) => {
  return await $fetch.post("/auth/login", payload);
};
