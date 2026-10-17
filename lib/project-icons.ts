import {
  Box, Briefcase, BookOpen, Calendar, Database, Gamepad2, Globe, GraduationCap,
  LayoutDashboard, MessageSquare, Package, Pill, Rocket, ShoppingCart, Smartphone,
  Stethoscope, Store, Terminal, Truck, Users, Wallet, Wrench,
  type LucideIcon,
} from "lucide-react"

export const PROJECT_ICONS = {
  "box": Box,
  "graduation-cap": GraduationCap,
  "pill": Pill,
  "stethoscope": Stethoscope,
  "shopping-cart": ShoppingCart,
  "store": Store,
  "package": Package,
  "truck": Truck,
  "wallet": Wallet,
  "layout-dashboard": LayoutDashboard,
  "users": Users,
  "calendar": Calendar,
  "message-square": MessageSquare,
  "book-open": BookOpen,
  "briefcase": Briefcase,
  "globe": Globe,
  "smartphone": Smartphone,
  "gamepad": Gamepad2,
  "database": Database,
  "terminal": Terminal,
  "rocket": Rocket,
  "wrench": Wrench,
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof PROJECT_ICONS

export const ICON_KEYS = Object.keys(PROJECT_ICONS) as IconKey[]
export const DEFAULT_ICON: IconKey = "box"

// لو الاسم مش موجود (اتشال من القايمة مثلًا) بيرجع الأيقونة الافتراضية
export function getProjectIcon(key?: string | null): LucideIcon {
  if (key && Object.prototype.hasOwnProperty.call(PROJECT_ICONS, key)) {
    return PROJECT_ICONS[key as IconKey]
  }
  return PROJECT_ICONS[DEFAULT_ICON]
}