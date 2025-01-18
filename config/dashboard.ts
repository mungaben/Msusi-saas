import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
        
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.ADMIN,
     
      },
      {
        href: "/dashboard/Transactions",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },

      {
        href: "/dashboard/Agents",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },
      {
        href: "/dashboard/Agents/10",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },
      {
        href: "/Agents/Customers",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },
      {
        href: "/Agents/profile",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },
      {
        href: "/Agents/Transactions",
        icon: "post",
        title: "Transactions",
        authorizeOnly: UserRole.ADMIN,
       
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.ADMIN,
     
      },
    ],
  },
];
