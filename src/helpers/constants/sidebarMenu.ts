import CertificationsIcon from "~/icons/sidebar-icons/certificates-icon";
import CoursesIcon from "~/icons/sidebar-icons/courses-icon";
import DashboardIcon from "~/icons/sidebar-icons/dashboard-icon";
import ProgressIcon from "~/icons/sidebar-icons/progress-icon";
import SettingsIcon from "~/icons/sidebar-icons/settings-icon";
import TeacherIcon from "~/icons/teacher-icon";

export const sidebarItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
    isUser: ["STUDENT", "TEACHER"],
  },
  {
    name: "All courses",
    icon: CoursesIcon,
    path: "/courses",
    isUser: ["STUDENT"],
  },
  {
    name: "My progress",
    icon: ProgressIcon,
    path: "/progress",
    isUser: ["STUDENT"],
  },
  {
    name: "Certifications",
    icon: CertificationsIcon,
    path: "/certifications",
    isUser: ["STUDENT"],
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
    isUser: ["STUDENT"],
  },
  { name: "Teachers", icon: TeacherIcon, path: "/teachers", isUser: ["ADMIN"] },
];
