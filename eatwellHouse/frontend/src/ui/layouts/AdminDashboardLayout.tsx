import { AdminDashboardSidebar } from "../molecules/admin-dashboard/AdminDashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
