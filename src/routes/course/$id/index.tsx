import { createFileRoute } from "@tanstack/react-router";
import CourseDashboard from "~/components/core/CourseDashboard";

export const Route = createFileRoute("/course/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CourseDashboard />
    </div>
  );
}
