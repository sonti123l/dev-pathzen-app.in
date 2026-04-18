// Skeleton component for the course detail page
const CourseDetailSkeleton = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">

      {/* Top bar skeleton */}
      <div className="flex items-center gap-4 px-5 h-14 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-4 w-48 rounded-full bg-gray-200 animate-pulse flex-1 max-w-xs" />
        <div className="flex items-center gap-2.5">
          <div className="h-3 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-1.5 w-28 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-3 w-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar skeleton */}
        <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="h-3 w-28 rounded-full bg-gray-200 animate-pulse" />
          </div>

          <div className="overflow-y-auto flex-1 py-3 px-4 flex flex-col gap-4">
            {[1, 2, 3].map((mod) => (
              <div key={mod} className="flex flex-col gap-2">

                {/* Module row */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
                  <div className="h-3.5 rounded-full bg-gray-200 animate-pulse flex-1" />
                  <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                </div>

                {/* Sub-module rows */}
                {mod === 1 && (
                  <div className="flex flex-col gap-2 pl-9">
                    {[1, 2, 3].map((sub) => (
                      <div key={sub} className="flex items-center gap-2 pl-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                        <div
                          className="h-3 rounded-full bg-gray-200 animate-pulse"
                          style={{ width: `${55 + sub * 12}%` }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">

          {/* Stats row */}
          <div className="flex gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 bg-white rounded-xl border border-gray-100 px-3.5 py-3 flex flex-col gap-2">
                <div className="h-2.5 w-16 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-5 w-12 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Lesson card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
            {/* Tag */}
            <div className="h-5 w-28 rounded-full bg-gray-200 animate-pulse" />

            {/* Title */}
            <div className="flex flex-col gap-2">
              <div className="h-5 w-64 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-40 rounded-full bg-gray-200 animate-pulse" />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Body text lines */}
            <div className="flex flex-col gap-2">
              <div className="h-3.5 w-full rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-[92%] rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-[78%] rounded-full bg-gray-200 animate-pulse" />
            </div>

            {/* Video thumbnail */}
            <div className="w-full h-44 rounded-xl bg-gray-200 animate-pulse" />

            {/* Button */}
            <div className="h-9 w-32 rounded-lg bg-gray-200 animate-pulse" />
          </div>

        </main>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;