import { createFileRoute } from "@tanstack/react-router";
import PathZenApp from "~/components/Index";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PathZenApp />
    </div>
  );
}
