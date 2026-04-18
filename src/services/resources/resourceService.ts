import { $fetch } from "~/http/fetch";

export const getColleges = async () => {
  try {
    const response = await $fetch.get("/api/colleges");
    return response;
  } catch (err) {
    throw err;
  }
};

export const getDomains = async () => {
  try {
    const response = await $fetch.get("/api/domains");
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCoursesByDomainId = async (id: number) => {
  try {
    const response = await $fetch.get(`/api/courses/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCourseDetailsByCourseId = async (courseId: number) => {
  try {
    const response = await $fetch.get(`/api/course/${courseId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllCourses = async () => {
  try {
    const response = await $fetch.get(`/api/courses`);
    return response;
  } catch (err) {
    throw err;
  }
};
