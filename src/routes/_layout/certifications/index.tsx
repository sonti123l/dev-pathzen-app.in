import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/certifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/certifications/"!</div>
}
