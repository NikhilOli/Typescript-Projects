import { createFileRoute } from "@tanstack/react-router";
import Food from "../../ui/pages/admin-dashboard/Food";
import AdminDashboardLayout from "../../ui/layouts/AdminDashboardLayout";

export const Route = createFileRoute("/admin-dashboard/add-food")({
  component: () => (
    <AdminDashboardLayout>
      <Food />
    </AdminDashboardLayout>
  ),
});
