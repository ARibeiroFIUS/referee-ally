import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const deadlines = [
  {
    id: 1,
    yearbook: "The Legal 500 2024",
    area: "Tributário",
    type: "Deadline de submissão",
    date: "2024-02-28",
    daysLeft: 3,
    priority: "high"
  },
  {
    id: 2,
    yearbook: "Chambers Global 2025",
    area: "Corporate/M&A",
    type: "Início da pesquisa",
    date: "2024-03-15",
    daysLeft: 18,
    priority: "medium"
  },
  {
    id: 3,
    yearbook: "Leaders League 2024",
    area: "Contencioso",
    type: "Deadline de submissão",
    date: "2024-03-20",
    daysLeft: 23,
    priority: "medium"
  },
  {
    id: 4,
    yearbook: "Análise Advocacia 500",
    area: "Trabalhista",
    type: "Fim da pesquisa",
    date: "2024-04-10",
    daysLeft: 44,
    priority: "low"
  },
];

const getPriorityColor = (priority: string, daysLeft: number) => {
  if (daysLeft <= 7) return "text-destructive";
  if (daysLeft <= 14) return "text-warning";
  return "text-muted-foreground";
};

const getPriorityBadge = (daysLeft: number) => {
  if (daysLeft <= 7) return { variant: "destructive" as const, label: "Urgente" };
  if (daysLeft <= 14) return { variant: "secondary" as const, label: "Próximo" };
  return { variant: "outline" as const, label: "Programado" };
};

export function UpcomingDeadlines() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Próximos Prazos</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          Ver calendário
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => {
            const badge = getPriorityBadge(deadline.daysLeft);
            return (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-gradient-subtle hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-2 rounded-lg bg-accent">
                    {deadline.daysLeft <= 7 ? (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    ) : (
                      <Calendar className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {deadline.yearbook}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {deadline.area}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {deadline.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getPriorityColor(deadline.priority, deadline.daysLeft)}`}>
                      {deadline.daysLeft} dias
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(deadline.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <Badge variant={badge.variant}>
                    {badge.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}