export default function CourseCardSkeleton() {
  return (
    <div className="w-100 border-2 h-64 rounded-xl flex flex-col bg-white shadow animate-pulse">
      {/* Top Section Skeleton */}
      <div className="flex flex-col items-center p-3 w-full h-32 rounded-t-xl bg-green-100">
        {/* Header row */}
        <div className="flex justify-between items-center w-full">
          {/* Domain name */}
          <div className="h-4 w-24 bg-gray-300 rounded" />

          {/* Status */}
          <div className="h-7 w-24 bg-gray-300 rounded-xl" />
        </div>

        {/* Logo Skeleton */}
        <div className="w-full flex justify-center items-center h-12 mt-4">
          <div className="w-9 h-9 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Bottom Section Skeleton */}
      <div className="h-32 bg-gray-900 rounded-b-lg p-3 flex flex-col justify-between">
        {/* Course name */}
        <div className="h-4 w-3/4 bg-gray-700 rounded" />

        {/* Button */}
        <div className="w-full flex justify-end">
          <div className="h-10 w-24 bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
