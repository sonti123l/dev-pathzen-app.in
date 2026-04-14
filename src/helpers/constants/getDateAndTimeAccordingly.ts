import { DateTime } from "luxon";

const now = DateTime.now().setZone("Asia/Kolkata");

const hour = now.hour;

const getDayAccordingToTime = (): string => {
  let partOfDay;

  if (hour >= 5 && hour < 12) {
    partOfDay = "Morning";
  } else if (hour >= 12 && hour < 17) {
    partOfDay = "Afternoon";
  } else if (hour >= 17 && hour < 21) {
    partOfDay = "Evening";
  } else {
    partOfDay = "Night";
  }

  return partOfDay;
};

export default getDayAccordingToTime;
