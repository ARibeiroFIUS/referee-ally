import { Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const submissions = [
  {
    id: 1,
    yearbook: "Chambers Global 2025",
    area: "Corporate/M&A",
    deadline: "2024-03-15",
    status: "Em preparação",
    referees: 18,
    maxReferees: 20,
    statusColor: "warning"
  },
  {
    id: 2,
    yearbook: "The Legal 500 2024",
    area: "Tributário",
    deadline: "2024-02-28",
    status: "Enviada",
    referees: 15,
    maxReferees: 15,
    statusColor: "success"
  },
  {
    id: 3,
    yearbook: "Leaders League 2024",
    area: "Contencioso",
    deadline: "2024-04-10",
    status: "Conflitos detectados",
    referees: 12,
    maxReferees: 20,
    statusColor: "destructive"
  },
  {
    id: 4,
    yearbook: "Análise Advocacia 500",
    area: "Trabalhista",
    deadline: "2024-03-20",
    status: "Em preparação",
    referees: 8,
    maxReferees: 15,
    statusColor: "warning"
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Enviada":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "Conflitos detectados":
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-warning" />;
  }
};

const getStatusVariant = (statusColor: string) => {
  switch (statusColor) {
    case "success":
      return "default" as const;
    case "destructive":
      return "destructive" as const;
    case "warning":
      return "secondary" as const;
    default:
      return "secondary" as const;
  }
};

export function RecentSubmissions() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Submissões Recentes</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-gradient-subtle hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center space-x-4 flex-1">
                {getStatusIcon(submission.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {submission.yearbook}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {submission.area}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prazo: {new Date(submission.deadline).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {submission.referees}/{submission.maxReferees}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    referees
                  </div>
                </div>
                <Badge variant={getStatusVariant(submission.statusColor)}>
                  {submission.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}