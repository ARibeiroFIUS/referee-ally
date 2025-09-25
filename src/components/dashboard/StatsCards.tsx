import { FileText, Users, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Submissões Ativas",
    value: "23",
    change: "+2 este mês",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/5",
  },
  {
    title: "Referees Cadastrados",
    value: "187",
    change: "+15 novos",
    icon: Users,
    color: "text-success",
    bgColor: "bg-success/5",
  },
  {
    title: "Prazos Próximos",
    value: "8",
    change: "Nos próximos 7 dias",
    icon: Calendar,
    color: "text-warning",
    bgColor: "bg-warning/5",
  },
  {
    title: "Conflitos Detectados",
    value: "3",
    change: "Requer atenção",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}