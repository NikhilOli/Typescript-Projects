import { AppSidebar } from "../molecules/dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
