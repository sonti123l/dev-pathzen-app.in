import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import { SetStateAction, useState } from "react";
import TruncatedItem from "~/components/TruncatedItem";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CloseIcon, PlusIcon, UserIcon } from "~/icons/teacher-form-icon";
import {
  registerTeacherErrorMessage,
  registrationFormDataForTeacher,
} from "~/lib/interfaces/app";

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
  coursesDetails: any;
  courseDetailsLoading: boolean;
  registerTeacher: registrationFormDataForTeacher;
  setRegisterTeacher: React.Dispatch<
    SetStateAction<registrationFormDataForTeacher>
  >;
  errors: registerTeacherErrorMessage;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddTeacherModal({
  open,
  onClose,
  coursesDetails,
  courseDetailsLoading,
  registerTeacher,
  setRegisterTeacher,
  errors,
  onSubmit,
}: AddTeacherModalProps) {
  const [skillInput, setSkillInput] = useState<string>("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const existing = registerTeacher?.technicalSkills?.skills ?? [];
    if (!existing.includes(trimmed)) {
      setRegisterTeacher((prev) => ({
        ...prev,
        technicalSkills: {
          ...prev?.technicalSkills,
          skills: [...existing, trimmed],
        },
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setRegisterTeacher((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev?.technicalSkills,
        skills: (prev?.technicalSkills?.skills ?? []).filter(
          (s) => s !== skill,
        ),
      },
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900"
        aria-label="Add teacher"
      >
        <PlusIcon />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 12 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-115 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                      <UserIcon />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Register new teacher
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        Added by admin — all fields required
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="px-5 py-5">
                  {/* Full Name + Email */}
                  <div className="mb-3.5 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Full Name
                      </label>
                      <Input
                        value={registerTeacher?.fullName}
                        onChange={(e) =>
                          setRegisterTeacher({
                            ...registerTeacher,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="Enter Full Name"
                        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-900"
                      />
                      {errors?.name && !registerTeacher?.fullName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors?.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Email
                      </label>
                      <Input
                        value={registerTeacher?.email}
                        onChange={(e) =>
                          setRegisterTeacher({
                            ...registerTeacher,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter email"
                        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-900"
                      />
                      {errors?.email && !registerTeacher?.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors?.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3.5">
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Password
                    </label>
                    <Input
                      value={registerTeacher?.password}
                      onChange={(e) =>
                        setRegisterTeacher({
                          ...registerTeacher,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter password"
                      className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-900"
                    />
                    {errors?.password && !registerTeacher?.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors?.password}
                      </p>
                    )}
                  </div>

                  <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                  {/* Assign Course + Experience */}
                  <div className="mb-3.5 grid grid-cols-2 gap-3">
                    <div className="flex w-full flex-col gap-1.5">
                      <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Assign Course
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setRegisterTeacher({
                            ...registerTeacher,
                            courseId: Number(value),
                          })
                        }
                      >
                        <SelectTrigger className="w-full rounded-xl border border-[#e0e8f7] bg-[#f3f6fd] px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-[#e0e8f7] bg-white shadow-lg">
                          {courseDetailsLoading ? (
                            <Loader />
                          ) : (
                            coursesDetails?.length > 0 &&
                            coursesDetails?.map(
                              (eachRecord: {
                                domain_id: number;
                                domain_name: string;
                                course_id: number;
                                course_name: string;
                                course_meta_data: any;
                                course_created_at: string;
                              }) => (
                                <SelectItem
                                  key={eachRecord?.course_id}
                                  value={String(eachRecord?.course_id)}
                                  className="cursor-pointer px-4 py-2 hover:bg-blue-50"
                                >
                                  <TruncatedItem
                                    name={eachRecord?.course_name}
                                    length={50}
                                  />
                                </SelectItem>
                              ),
                            )
                          )}
                        </SelectContent>
                      </Select>
                      {errors?.course_id && !registerTeacher?.courseId && (
                        <p className="text-xs text-red-500">
                          {errors?.course_id}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Experience
                      </label>
                      <Input
                        value={registerTeacher?.experience}
                        onChange={(e) =>
                          setRegisterTeacher({
                            ...registerTeacher,
                            experience: e.target.value,
                          })
                        }
                        placeholder="ex: 5 years"
                        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-900"
                      />
                      {errors?.experience && !registerTeacher?.experience && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors?.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="mb-5">
                    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Technical Skills
                    </label>

                    {/* Chips */}
                    {(registerTeacher?.technicalSkills?.skills ?? []).length >
                      0 && (
                      <div className="mb-2 flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                        {registerTeacher.technicalSkills.skills.map((skill) => (
                          <span
                            key={skill}
                            className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors"
                              aria-label={`Remove ${skill}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Input + Add button */}
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. React, Node.js — press Enter or Add"
                        className="h-9 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:bg-gray-900"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                      Press Enter or click Add. Click × on a chip to remove it.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    >
                      Register teacher
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
