import { useState } from "react";
import { Plus, Filter, Search, Edit, Calendar, Users, AlertTriangle } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const submissions = [
  {
    id: 1,
    yearbook: "Chambers Global 2025",
    area: "Corporate/M&A",
    year: "2025",
    deadline: "2024-03-15",
    researchStart: "2024-05-01",
    researchEnd: "2024-07-31",
    status: "Em preparação",
    referees: 18,
    maxReferees: 20,
    conflicts: 0,
    statusColor: "warning"
  },
  {
    id: 2,
    yearbook: "The Legal 500 2024",
    area: "Tributário",
    year: "2024",
    deadline: "2024-02-28",
    researchStart: "2024-04-01",
    researchEnd: "2024-06-30",
    status: "Enviada",
    referees: 15,
    maxReferees: 15,
    conflicts: 0,
    statusColor: "success"
  },
  {
    id: 3,
    yearbook: "Leaders League 2024",
    area: "Contencioso",
    year: "2024",
    deadline: "2024-04-10",
    researchStart: "2024-06-01",
    researchEnd: "2024-08-31",
    status: "Conflitos detectados",
    referees: 12,
    maxReferees: 20,
    conflicts: 2,
    statusColor: "destructive"
  },
  {
    id: 4,
    yearbook: "Análise Advocacia 500",
    area: "Trabalhista",
    year: "2024",
    deadline: "2024-03-20",
    researchStart: "2024-05-15",
    researchEnd: "2024-07-15",
    status: "Em preparação",
    referees: 8,
    maxReferees: 15,
    conflicts: 0,
    statusColor: "warning"
  },
  {
    id: 5,
    yearbook: "Chambers Latin America 2025",
    area: "Banking & Finance",
    year: "2025",
    deadline: "2024-04-01",
    researchStart: "2024-06-01",
    researchEnd: "2024-08-31",
    status: "Em preparação",
    referees: 14,
    maxReferees: 20,
    conflicts: 1,
    statusColor: "warning"
  },
  {
    id: 6,
    yearbook: "IFLR1000 2025",
    area: "Capital Markets",
    year: "2025",
    deadline: "2024-03-30",
    researchStart: "2024-05-01",
    researchEnd: "2024-07-31",
    status: "Em preparação",
    referees: 20,
    maxReferees: 20,
    conflicts: 0,
    statusColor: "success"
  }
];

const getStatusBadge = (status: string, statusColor: string) => {
  const variants = {
    success: "default" as const,
    destructive: "destructive" as const,
    warning: "secondary" as const,
  };
  return variants[statusColor] || "secondary";
};

export default function Submissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedYearbook, setSelectedYearbook] = useState("all");

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.yearbook.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "all" || submission.area === selectedArea;
    const matchesYearbook = selectedYearbook === "all" || submission.yearbook.includes(selectedYearbook);
    
    return matchesSearch && matchesArea && matchesYearbook;
  });

  const areas = [...new Set(submissions.map(s => s.area))];
  const yearbooks = [...new Set(submissions.map(s => s.yearbook.split(' ')[0]))];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/submissions" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Submissões
                </h1>
                <p className="text-muted-foreground">
                  Gerencie submissões para anuários jurídicos por área de prática
                </p>
              </div>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Submissão
              </Button>
            </div>

            {/* Filters */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar submissões..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as áreas</SelectItem>
                      {areas.map(area => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYearbook} onValueChange={setSelectedYearbook}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por anuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os anuários</SelectItem>
                      {yearbooks.map(yearbook => (
                        <SelectItem key={yearbook} value={yearbook}>{yearbook}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Mais filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submissions Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-2 truncate">
                          {submission.yearbook}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{submission.area}</Badge>
                          <Badge variant="secondary">{submission.year}</Badge>
                        </div>
                      </div>
                      {submission.conflicts > 0 && (
                        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={getStatusBadge(submission.status, submission.statusColor)}>
                        {submission.status}
                      </Badge>
                    </div>

                    {/* Referees */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Referees:</span>
                      </div>
                      <div className="text-sm font-medium">
                        {submission.referees}/{submission.maxReferees}
                        {submission.conflicts > 0 && (
                          <span className="text-destructive ml-1">
                            ({submission.conflicts} conflitos)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Deadline:</span>
                      </div>
                      <span className="text-sm font-medium">
                        {new Date(submission.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    {/* Research Period */}
                    <div className="text-xs text-muted-foreground">
                      Pesquisa: {new Date(submission.researchStart).toLocaleDateString('pt-BR')} - {new Date(submission.researchEnd).toLocaleDateString('pt-BR')}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Gerenciar Referees
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSubmissions.length === 0 && (
              <Card className="shadow-soft">
                <CardContent className="py-12 text-center">
                  <div className="text-muted-foreground">
                    Nenhuma submissão encontrada com os filtros aplicados.
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}