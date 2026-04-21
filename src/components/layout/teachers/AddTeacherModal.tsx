import { motion, AnimatePresence } from "framer-motion";
import Field, {
  CloseIcon,
  PlusIcon,
  UserIcon,
} from "~/icons/teacher-form-icon";

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}



export default function AddTeacherModal({
  open,
  onClose,
  onSubmit,
}: AddTeacherModalProps) {
  return (
    <>
      {/* FAB — floating add button */}
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
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal card */}
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
                className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
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
                  {/* Row — ID + Name */}
                  <div className="mb-3.5 grid grid-cols-2 gap-3">
                    <Field
                      label="Full name"
                      name="teacher_name"
                      placeholder="John Doe"
                    />
                    {/* Email */}
                    <Field
                      label="Email address"
                      name="teacher_email_id"
                      type="email"
                      placeholder="john.doe@school.edu"
                      className="mb-3.5"
                    />
                  </div>

                  {/* Password */}
                  <Field
                    label="Password"
                    name="teacher_password"
                    type="password"
                    placeholder="Set initial password"
                    className="mb-3.5"
                  />

                  <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                  {/* Row — Course + Experience */}
                  <div className="mb-3.5 grid grid-cols-2 gap-3">
                    <Field
                      label="Course"
                      name="teacher_course_id"
                      type="text"
                      placeholder="Optional"
                    />
                    <Field
                      label="Experience"
                      name="teacher_experience"
                      placeholder="e.g. 5 years"
                    />
                  </div>

                  {/* Technical skills */}
                  <Field
                    label="Technical skills"
                    name="teacher_technicalities"
                    placeholder="React, Node.js, MySQL..."
                    className="mb-3.5"
                  />

                  {/* User ID */}
                  <Field
                    label="User ID (optional)"
                    name="teacher_user_id"
                    type="number"
                    placeholder="Linked user ID"
                    className="mb-5"
                  />

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
