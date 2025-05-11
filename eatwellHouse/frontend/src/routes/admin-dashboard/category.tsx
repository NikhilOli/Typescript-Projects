import { createFileRoute } from '@tanstack/react-router'
import AdminDashboardLayout from '../../ui/layouts/AdminDashboardLayout'
import Category from '../../ui/pages/admin-dashboard/Category'

export const Route = createFileRoute('/admin-dashboard/category')({
  component: () => (
    <AdminDashboardLayout>
      <Category />
    </AdminDashboardLayout>
  ),
})


