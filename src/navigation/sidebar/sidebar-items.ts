import {
  Banknote,
  Calendar,
  ChartBar,
  Fingerprint,
  Forklift,
  Gauge,
  GraduationCap,
  Hospital,
  Package,
  Kanban,
  LayoutDashboard,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  ReceiptText,
  Server,
  ShoppingBag,
  SquareArrowUpRight,
  Users,
} from "lucide-react";

export type NavBadge = "new" | "soon" | "verp";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      // {
      //   id: "default",
      //   title: "Dashboard Option 1",
      //   url: "/dashboard/default",
      //   icon: LayoutDashboard,
      // },
      // {
      //   id: "crm",
      //   title: "Dashboard Option 2",
      //   url: "/dashboard/crm",
      //   icon: ChartBar,
      // },
      // {
      //   id: "finance",
      //   title: "Dashboard Option 3",
      //   url: "/dashboard/finance",
      //   icon: Banknote,
      // },
      // {
      //   id: "analytics",
      //   title: "Dashboard Option 4",
      //   url: "/dashboard/analytics",
      //   icon: Gauge,
      // },
      // {
      //   id: "productivity",
      //   title: "Dashboard Option 5",
      //   url: "/dashboard/productivity",
      //   icon: ListTodo,
      // },
      // {
      //   id: "ecommerce",
      //   title: "Dashboard Option 6",
      //   url: "/dashboard/ecommerce",
      //   icon: ShoppingBag,
      // },
      // {
      //   id: "academy",
      //   title: "Dashboard Option 5",
      //   url: "/dashboard/academy",
      //   icon: GraduationCap,
      // },
      {
        id: "verp",
        title: "Dashboard",
        url: "/dashboard/verp",
        icon: Hospital,
        badge: "verp",
      },
      // {
      //   id: "pos-grn",
      //   title: "POS Management - GRN",
      //   url: "/dashboard/pos-grn",
      //   icon: Package,
      //   badge: "new",
      // },
      // {
      //   id: "logistics",
      //   title: "Dashboard Option 8",
      //   url: "/dashboard/logistics",
      //   icon: Forklift,
      // },
      // {
      //   id: "infrastructure",
      //   title: "Dashboard Option 9",
      //   url: "/dashboard/infrastructure",
      //   icon: Server,
      //   badge: "new",
      // },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      // {
      //   id: "email",
      //   title: "Email",
      //   url: "/dashboard/mail",
      //   icon: Mail,
      // },
      // {
      //   id: "chat",
      //   title: "Chat",
      //   url: "/dashboard/chat",
      //   icon: MessageSquare,
      // },
      // {
      //   id: "calendar",
      //   title: "Calendar",
      //   url: "/dashboard/calendar",
      //   icon: Calendar,
      // },
      // {
      //   id: "kanban",
      //   title: "Kanban",
      //   url: "/dashboard/kanban",
      //   icon: Kanban,
      // },
      // {
      //   id: "invoice",
      //   title: "Invoice",
      //   url: "/dashboard/invoice",
      //   icon: ReceiptText,
      // },
      {
        id: "users",
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        id: "pos-grn",
        title: "GRN Management",
        url: "/dashboard/pos-grn",
        icon: Package,
      },
      {
        id: "pos-grn-returns",
        title: "GRN Returns",
        url: "/dashboard/pos-grn-returns",
        icon: Package,
      },
      // {
      //   id: "roles",
      //   title: "Roles",
      //   url: "/dashboard/roles",
      //   icon: Lock,
      // },
      {
        id: "authentication",
        title: "Authentication",
        icon: Fingerprint,
        subItems: [
          { id: "auth-login-v1", title: "Login v1", url: "/auth/v1/login", newTab: true },
          { id: "auth-login-v2", title: "Login v2", url: "/auth/v2/login", newTab: true },
          { id: "auth-register-v1", title: "Register v1", url: "/auth/v1/register", newTab: true },
          { id: "auth-register-v2", title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  // {
  //   id: 3,
  //   label: "Legacy",
  //   items: [
  //     {
  //       id: "legacy-dashboards",
  //       title: "Dashboards",
  //       subItems: [
  //         { id: "legacy-default", title: "Default V1", url: "/dashboard/default-v1" },
  //         { id: "legacy-crm", title: "CRM V1", url: "/dashboard/crm-v1" },
  //         { id: "legacy-finance", title: "Finance V1", url: "/dashboard/finance-v1" },
  //         { id: "legacy-analytics", title: "Analytics V1", url: "/dashboard/analytics-v1" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   label: "Misc",
  //   items: [
  //     {
  //       id: "others",
  //       title: "Others",
  //       url: "/dashboard/coming-soon",
  //       icon: SquareArrowUpRight,
  //       badge: "soon",
  //       disabled: true,
  //     },
  //   ],
  // },
];
