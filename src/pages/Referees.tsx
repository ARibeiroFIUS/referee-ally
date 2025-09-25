import { useState } from "react";
import { Search, Filter, Building, Mail, Phone, Calendar, BarChart3, AlertTriangle, Users } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const referees = [
  {
    id: 1,
    name: "João Silva",
    position: "CEO",
    company: "Tech Solutions Ltda",
    email: "joao.silva@techsolutions.com",
    phone: "+55 11 99999-9999",
    primaryArea: "Corporate/M&A",
    interactionHours: 120,
    totalSubmissions: 5,
    lastUsed: "2024-01-15",
    responseRate: 85,
    conflicts: 0,
    status: "Ativo"
  },
  {
    id: 2,
    name: "Maria Santos",
    position: "Diretora Jurídica",
    company: "Banco Nacional",
    email: "maria.santos@banconacional.com",
    phone: "+55 11 88888-8888",
    primaryArea: "Banking & Finance",
    interactionHours: 95,
    totalSubmissions: 8,
    lastUsed: "2024-01-20",
    responseRate: 92,
    conflicts: 0,
    status: "Ativo"
  },
  {
    id: 3,
    name: "Pedro Costa",
    position: "General Counsel",
    company: "Indústria ABC",
    email: "pedro.costa@industriaabc.com",
    phone: "+55 11 77777-7777",
    primaryArea: "Tributário",
    interactionHours: 75,
    totalSubmissions: 3,
    lastUsed: "2023-12-10",
    responseRate: 67,
    conflicts: 1,
    status: "Conflito"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    position: "VP Legal",
    company: "StartupCorp",
    email: "ana.oliveira@startupcorp.com",
    phone: "+55 11 66666-6666",
    primaryArea: "Corporate/M&A",
    interactionHours: 150,
    totalSubmissions: 6,
    lastUsed: "2024-02-01",
    responseRate: 100,
    conflicts: 0,
    status: "Ativo"
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    position: "Diretor de Compliance",
    company: "MegaCorp Brasil",
    email: "carlos.ferreira@megacorp.com",
    phone: "+55 11 55555-5555",
    primaryArea: "Compliance",
    interactionHours: 85,
    totalSubmissions: 2,
    lastUsed: "2024-01-25",
    responseRate: 50,
    conflicts: 0,
    status: "Baixa resposta"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ativo":
      return "default" as const;
    case "Conflito":
      return "destructive" as const;
    case "Baixa resposta":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

const getResponseColor = (rate: number) => {
  if (rate >= 80) return "text-success";
  if (rate >= 60) return "text-warning";
  return "text-destructive";
};

export default function Referees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredReferees = referees.filter(referee => {
    const matchesSearch = referee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referee.primaryArea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "all" || referee.primaryArea === selectedArea;
    const matchesStatus = selectedStatus === "all" || referee.status === selectedStatus;
    
    return matchesSearch && matchesArea && matchesStatus;
  });

  const areas = [...new Set(referees.map(r => r.primaryArea))];
  const statuses = [...new Set(referees.map(r => r.status))];

  // Analytics
  const totalReferees = referees.length;
  const activeReferees = referees.filter(r => r.status === "Ativo").length;
  const avgResponseRate = Math.round(referees.reduce((acc, r) => acc + r.responseRate, 0) / referees.length);
  const refereesWithConflicts = referees.filter(r => r.conflicts > 0).length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/referees" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Referees
                </h1>
                <p className="text-muted-foreground">
                  Gerencie e analise seus clientes referees para submissões
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{totalReferees}</div>
                      <div className="text-sm text-muted-foreground">Total de Referees</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-success" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{activeReferees}</div>
                      <div className="text-sm text-muted-foreground">Referees Ativos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-warning" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{avgResponseRate}%</div>
                      <div className="text-sm text-muted-foreground">Taxa Resposta Média</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{refereesWithConflicts}</div>
                      <div className="text-sm text-muted-foreground">Com Conflitos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="list" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Lista de Referees</TabsTrigger>
                <TabsTrigger value="analytics">Análises</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-6">
                {/* Filters */}
                <Card className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Buscar referees..."
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

                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os status</SelectItem>
                          {statuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Exportar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Referees List */}
                <div className="grid gap-4">
                  {filteredReferees.map((referee) => (
                    <Card key={referee.id} className="shadow-soft hover:shadow-medium transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold text-foreground">{referee.name}</h3>
                                  <Badge variant={getStatusBadge(referee.status)}>
                                    {referee.status}
                                  </Badge>
                                  {referee.conflicts > 0 && (
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{referee.position}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Building className="h-3 w-3 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">{referee.company}</p>
                                </div>
                              </div>
                              <Badge variant="outline">{referee.primaryArea}</Badge>
                            </div>

                            {/* Contact Info */}
                            <div className="grid gap-2 md:grid-cols-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{referee.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{referee.phone}</span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="grid gap-4 md:grid-cols-4 pt-2 border-t">
                              <div>
                                <label className="text-xs text-muted-foreground">Horas de Interação</label>
                                <p className="text-sm font-medium">{referee.interactionHours}h</p>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">Submissões</label>
                                <p className="text-sm font-medium">{referee.totalSubmissions}</p>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">Taxa de Resposta</label>
                                <p className={`text-sm font-medium ${getResponseColor(referee.responseRate)}`}>
                                  {referee.responseRate}%
                                </p>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">Último Uso</label>
                                <p className="text-sm font-medium">{new Date(referee.lastUsed).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button variant="outline" size="sm">
                              Ver Histórico
                            </Button>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Distribuição por Área</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {areas.map(area => {
                          const count = referees.filter(r => r.primaryArea === area).length;
                          const percentage = Math.round((count / totalReferees) * 100);
                          return (
                            <div key={area} className="flex items-center justify-between">
                              <span className="text-sm">{area}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{count}</span>
                                <span className="text-xs text-muted-foreground">({percentage}%)</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Performance de Resposta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Excelente (≥80%)</span>
                          <span className="text-sm font-medium text-success">
                            {referees.filter(r => r.responseRate >= 80).length} referees
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Boa (60-79%)</span>
                          <span className="text-sm font-medium text-warning">
                            {referees.filter(r => r.responseRate >= 60 && r.responseRate < 80).length} referees
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Baixa (&lt;60%)</span>
                          <span className="text-sm font-medium text-destructive">
                            {referees.filter(r => r.responseRate < 60).length} referees
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}