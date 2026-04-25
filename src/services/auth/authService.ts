import { $fetch } from "~/http/fetch";
import { loginPayload, registerPayload, registerTeacherPayload } from "~/lib/interfaces/auth";

export const userLogin = async ({ payload }: { payload: loginPayload }) => {
  try {
    const response = await $fetch.post("/auth/login", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async ({
  payload,
}: {
  payload: registerPayload;
}) => {
  try {
    const response = await $fetch.post("/auth/register", payload);
    return response;
  } catch (error) {
    throw error;
  }
};


export const registerTeacherApi = async ({
  payload,
}: {
  payload: registerTeacherPayload;
}) => {
  try {
    const response = await $fetch.post("/auth/register-teacher", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
