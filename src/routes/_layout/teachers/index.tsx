import { createFileRoute } from "@tanstack/react-router";
import DisplayTeacher from "~/components/layout/teachers/Teachers";

export const Route = createFileRoute("/_layout/teachers/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DisplayTeacher />
    </div>
  );
}
