import { $fetch } from "~/http/fetch";

export const getColleges = async ({page, limit, search}: {page: number, limit: number, search: string}) => {
  const response = await $fetch.get(`/api/colleges?page=${page}&limit=${limit}&search=${search}`);
  return response;
};

export const getDomains = async () => {
  const response = await $fetch.get("/api/domains");
  return response;
};

export const getCoursesByDomainId = async (id: number) => {
  const response = await $fetch.get(`/api/courses/${id}`);
  return response;
};

export const getCourseDetailsByCourseId = async (courseId: number) => {
  const response = await $fetch.get(`/api/course/${courseId}`);
  return response;
};

export const getAllCourses = async () => {
  const response = await $fetch.get(`/api/courses`);
  return response;
};
