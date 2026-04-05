import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '~/components/auth/LoginPage'

export const Route = createFileRoute('/_auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
  <div>
    <LoginPage>
    </LoginPage>
  </div>
  );
}
