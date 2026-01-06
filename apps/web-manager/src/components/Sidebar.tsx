import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Users,
  Scissors,
  UserCircle,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useAuth } from "@/features/auth";

const navItems = [
  { icon: Calendar, label: "Kalendarz", path: "/" },
  { icon: Users, label: "Klienci", path: "/clients" },
  { icon: Scissors, label: "Usługi", path: "/services" },
  { icon: UserCircle, label: "Pracownicy", path: "/employees" },
  { icon: Package, label: "Magazyn", path: "/inventory" },
  { icon: BarChart3, label: "Raporty", path: "/reports" },
  { icon: Settings, label: "Ustawienia", path: "/settings" },
] as const;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const userInitials = user?.email
    ? user.email.split("@")[0].slice(0, 2).toUpperCase()
    : "??";

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sidebar-primary/20">
          <Leaf className="w-6 h-6 text-sidebar-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-sidebar-foreground">
            Beaution
          </h1>
          <p className="text-xs text-sidebar-foreground/60">Salon Manager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn("sidebar-item", isActive && "sidebar-item-active")}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent/50">
          <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-primary">
              {userInitials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.email ?? "Gość"}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Zalogowany</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
            title="Wyloguj się"
          >
            <LogOut className="w-4 h-4 text-sidebar-foreground/60" />
          </button>
        </div>
      </div>
    </aside>
  );
}
