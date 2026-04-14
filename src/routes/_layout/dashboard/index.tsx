import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "~/components/layout/Dashboard";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
