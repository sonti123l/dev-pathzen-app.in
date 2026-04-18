import { createFileRoute } from '@tanstack/react-router'
import AllCourses from '~/components/layout/Courses'

export const Route = createFileRoute('/_layout/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><AllCourses/></div>
}
