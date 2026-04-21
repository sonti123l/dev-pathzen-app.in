import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/plan/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/plan/"!</div>
}
