import { Plus, Upload, Download, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "Nova Submissão",
    description: "Criar submissão para anuário",
    icon: Plus,
    color: "bg-primary text-primary-foreground hover:bg-primary-hover",
    action: "create-submission"
  },
  {
    title: "Importar Referees",
    description: "Upload de lista de clientes",
    icon: Upload,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    action: "import-referees"
  },
  {
    title: "Exportar Relatório",
    description: "Baixar dados em Excel",
    icon: Download,
    color: "bg-success text-success-foreground hover:bg-success/90",
    action: "export-data"
  },
  {
    title: "Configurar Anuários",
    description: "Gerenciar anuários e áreas",
    icon: Settings,
    color: "bg-muted text-muted-foreground hover:bg-muted/80",
    action: "settings"
  },
];

export function QuickActions() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-soft transition-all"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}