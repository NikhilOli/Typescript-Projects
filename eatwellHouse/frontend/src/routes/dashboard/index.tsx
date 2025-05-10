import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../../ui/layouts/DashboardLayout'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout>Hello</DashboardLayout>
}
