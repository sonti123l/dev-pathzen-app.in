import { createFileRoute } from '@tanstack/react-router'
import RegisterPage from '~/components/auth/registerPage'

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><RegisterPage/></div>
}
