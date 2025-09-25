import { 
  Home, 
  Calendar, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentPath?: string;
}

const navigationItems = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: Home, 
    description: "Visão geral das submissões" 
  },
  { 
    name: "Submissões", 
    href: "/submissions", 
    icon: FileText, 
    description: "Gerenciar submissões por anuário" 
  },
  { 
    name: "Referees", 
    href: "/referees", 
    icon: Users, 
    description: "Controle de clientes indicados" 
  },
  { 
    name: "Calendário", 
    href: "/calendar", 
    icon: Calendar, 
    description: "Cronograma de prazos" 
  },
  { 
    name: "Relatórios", 
    href: "/reports", 
    icon: BarChart3, 
    description: "Análises e métricas" 
  },
  { 
    name: "Configurações", 
    href: "/settings", 
    icon: Settings, 
    description: "Anuários e áreas" 
  },
];

const statusItems = [
  { label: "Ativo", count: 12, icon: CheckCircle2, color: "text-success" },
  { label: "Pendente", count: 8, icon: Clock, color: "text-warning" },
  { label: "Alertas", count: 3, icon: AlertTriangle, color: "text-destructive" },
];

export function Sidebar({ currentPath = "/" }: SidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col bg-gradient-secondary shadow-strong">
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-secondary-foreground">
              LegalRank
            </h1>
            <p className="text-xs text-secondary-foreground/70">
              Gestão de Submissões
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2.5 text-left font-normal text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-white/10",
                isActive && "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              <span className="text-sm">{item.name}</span>
            </Button>
          );
        })}
      </nav>

      {/* Status Overview */}
      <div className="border-t border-white/10 p-4">
        <h3 className="text-sm font-medium text-secondary-foreground mb-3">
          Status Geral
        </h3>
        <div className="space-y-2">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={cn("h-4 w-4", item.color)} />
                  <span className="text-sm text-secondary-foreground/80">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-secondary-foreground">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}