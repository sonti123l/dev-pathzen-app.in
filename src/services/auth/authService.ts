import { $fetch } from "~/http/fetch";
import { loginPayload, registerPayload, registerTeacherPayload } from "~/lib/interfaces/auth";

export const userLogin = async ({ payload }: { payload: loginPayload }) => {
  const response = await $fetch.post("/auth/login", payload);
  return response;
};

export const registerUser = async ({
  payload,
}: {
  payload: registerPayload;
}) => {
  const response = await $fetch.post("/auth/register", payload);
  return response;
};


export const registerTeacherApi = async ({
  payload,
}: {
  payload: registerTeacherPayload;
}) => {
  const response = await $fetch.post("/auth/register-teacher", payload);
  return response;
};
