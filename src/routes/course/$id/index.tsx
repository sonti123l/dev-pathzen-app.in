import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$id/"!</div>
}
