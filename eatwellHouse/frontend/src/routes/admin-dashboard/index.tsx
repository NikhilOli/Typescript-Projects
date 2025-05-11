import { createFileRoute } from '@tanstack/react-router'
import AdminDashboardLayout from '../../ui/layouts/AdminDashboardLayout'
import HomePage from '../../ui/pages/admin-dashboard/HomePage'

export const Route = createFileRoute('/admin-dashboard/')({
  component: () => <AdminDashboardLayout>
    <HomePage />
    </AdminDashboardLayout>
})
