import { ListOrdered, Lock, User } from "lucide-react";
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
    title: "My Orders",
    url: "/dashboard/orders",
    icon: ListOrdered,
},
{
    title: "My Account",
    url: "/dashboard/account",
    icon: User,
},
{
    title: "Logout",
    url: "/logout",
    icon: Lock,
},
];

export function AppSidebar() {
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
