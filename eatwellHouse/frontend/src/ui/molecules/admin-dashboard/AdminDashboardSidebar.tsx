import { House, Lock, Pizza, UtensilsCrossed } from "lucide-react";
import {
Sidebar,
SidebarContent,
SidebarGroup,
SidebarGroupContent,
SidebarGroupLabel,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
} from "../../shadcn/sidebar";
import { Link } from "@tanstack/react-router";

// Menu items.
const items = [
{
    title: "Home",
    url: "/admin-dashboard",
    icon: House,
},
{
    title: "Food Category",
    url: "/admin-dashboard/category",
    icon: UtensilsCrossed,
},
{
    title: "Foods",
    url: "/admin-dashboard/add-food",
    icon: Pizza,
},
{
    title: "Orders", 
    url: "/dashboard/orders",
    icon: Lock,
},
];

export function AdminDashboardSidebar() {
return (
    <Sidebar>
    <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <Link to={item.url} activeProps={() => {
                        return {
                            style: {
                                backgroundColor: "rgba(0, 0, 0, 0.1",
                            }
                        }
                    }}>
                    <item.icon />
                    <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
    </Sidebar>
);
}
