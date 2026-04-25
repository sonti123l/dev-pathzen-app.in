import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "~/services/resources/resourceService";

export const useAllCourses = () => {
  return useQuery({
    queryKey: ["course-details"],
    queryFn: async () => {
      const res = await getAllCourses();
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
    retry: 1
  });
};
