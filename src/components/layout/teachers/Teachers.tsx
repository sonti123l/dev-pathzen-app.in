import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardIcon, TableIcon } from "~/icons/teacher-form-icon";
import AddTeacherModal from "./AddTeacherModal";
import { useAllCourses } from "~/hooks/use-custom-hooks";
import { toast } from "sonner";
import {
  registerTeacherErrorMessage,
  registrationFormDataForTeacher,
} from "~/lib/interfaces/app";
import { useMutation } from "@tanstack/react-query";
import { registerTeacherApi } from "~/services/auth/authService";
import { registerTeacherPayload } from "~/lib/interfaces/auth";

interface Teacher {
  teacher_name: string;
  teacher_email_id: string;
  teacher_password: string;
  teacher_course_id: number | null;
  teacher_experience: string;
  teacher_technicalities: {
    skills: string[];
  };
}

type ViewMode = "table" | "card";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
];

function avatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export default function DisplayTeacher() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("table");
  const [coursesList, setCoursesList] = useState([]);

  const [registerTeacher, setRegisterTeacher] =
    useState<registrationFormDataForTeacher>({
      fullName: "",
      email: "",
      password: "",
      courseId: 0,
      technicalSkills: {
        skills: [""],
      },
      experience: "",
    });

  const [teachers] = useState<Teacher[]>([
    {
      teacher_name: "",
      teacher_email_id: "",
      teacher_password: "",
      teacher_course_id: 0,
      teacher_experience: "",
      teacher_technicalities: {
        skills: [""],
      },
    },
  ]);

  // registration errors message
  const [errorMessages, setErrorMessages] =
    useState<registerTeacherErrorMessage>({
      name: "",
      email: "",
      password: "",
      experience: "",
      course_id: "",
    });

  const {
    data: allCourseDetails,
    isSuccess: successfullyGotAllCourses,
    isError: errorWhileRetrieving,
    isLoading: coursesDetailsAreLoading,
  } = useAllCourses();

  const registerTeacherMutation = useMutation({
    mutationKey: ["register-teacher"],
    mutationFn: async (payload: registerTeacherPayload) => {
      const res = await registerTeacherApi({ payload });
      return res?.data;
    },
    onSuccess: () => {
      toast.success("Teacher created successfully");
    },
    onError: (error) => {
      if (error?.status === 422) {
        const errors = error?.data.data;
        const nameError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "name",
        )?.[0];

        const passwordError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "password",
        )?.[0];

        const experienceError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "experience",
        )?.[0];

        setErrorMessages((prev) => ({
          ...prev,
          name: nameError?.message,
          email: "email is required",
          password: passwordError?.message,
          experience: experienceError?.message,
          course_id: "Course is required",
        }));
      }
    },
  });

  useEffect(() => {
    if (successfullyGotAllCourses) {
      setCoursesList(allCourseDetails);
    }

    if (errorWhileRetrieving) {
      toast.error("Course details are not fetched");
    }
  }, [
    allCourseDetails,
    successfullyGotAllCourses,
    errorWhileRetrieving,
    setCoursesList,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      fullName: registerTeacher?.fullName,
      email: registerTeacher?.email,
      password: registerTeacher?.password,
      courseId: registerTeacher?.courseId,
      experience: registerTeacher?.experience,
      technicalSkills: registerTeacher?.technicalSkills,
    };

    registerTeacherMutation.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Teachers
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-900">
            <ToggleBtn
              active={view === "table"}
              onClick={() => setView("table")}
              label="Table view"
            >
              <TableIcon />
            </ToggleBtn>
            <ToggleBtn
              active={view === "card"}
              onClick={() => setView("card")}
              label="Card view"
            >
              <CardIcon />
            </ToggleBtn>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <span className="text-base leading-none">+</span>
            Add teacher
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <TeacherTable teachers={teachers} />
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <TeacherCards teachers={teachers} />
          </motion.div>
        )}
      </AnimatePresence>

      <AddTeacherModal
        open={open}
        onClose={() => setOpen(false)}
        coursesDetails={coursesList}
        courseDetailsLoading={coursesDetailsAreLoading}
        registerTeacher={registerTeacher}
        setRegisterTeacher={setRegisterTeacher}
        errors={errorMessages}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function TeacherTable({ teachers }: { teachers: Teacher[] }) {
  const cols = [
    { key: "teacher_name", label: "Name" },
    { key: "teacher_email_id", label: "Email" },
    { key: "teacher_course_id", label: "Course ID" },
    { key: "teacher_experience", label: "Experience" },
    { key: "teacher_technicalities", label: "Skills" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {cols.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers?.map((t, i) => (
              <motion.tr
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-800/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {t.teacher_name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {t.teacher_email_id}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {t.teacher_course_id ?? (
                    <span className="text-gray-400 dark:text-gray-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {t.teacher_experience}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {t.teacher_technicalities.skills?.map((eachSkill) =>
                      eachSkill.split(",").map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {s.trim()}
                        </span>
                      )),
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherCards({ teachers }: { teachers: Teacher[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teachers.map((t, i) => (
        <motion.div
          key={t.teacher_id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.07,
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
        >
          {/* Card header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColor(t.teacher_id)}`}
              ></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t.teacher_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.teacher_email_id}
                </p>
              </div>
            </div>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              #{t.teacher_id}
            </span>
          </div>

          <div className="mb-3 border-t border-gray-100 dark:border-gray-800" />

          {/* Details */}
          <div className="space-y-2 text-sm">
            <Row label="Experience" value={t.teacher_experience} />
            <Row
              label="Course ID"
              value={t.teacher_course_id ? String(t.teacher_course_id) : "—"}
            />
            <Row
              label="User ID"
              value={t.teacher_user_id ? String(t.teacher_user_id) : "—"}
            />
          </div>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {t.teacher_technicalities.split(",").map((s) => (
              <span
                key={s}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                {s.trim()}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {value}
      </span>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}
