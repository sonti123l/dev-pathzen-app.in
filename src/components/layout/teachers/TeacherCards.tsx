import { motion } from "framer-motion";

function TeacherCards({ teachers }: { teachers: Teacher[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teachers.map((t, i) => (
        <motion.div
          key={t.teacher_id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 280, damping: 24 }}
          className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
        >
          {/* Card header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColor(t.teacher_id)}`}
              >
                {initials(t.teacher_name)}
              </div>
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