import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "~/components/AppLayout";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AppLayout>
        <div></div>
      </AppLayout>
    </div>
  );
}
