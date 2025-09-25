import { useState } from "react";
import { ArrowLeft, Plus, AlertTriangle, CheckCircle2, Clock, Users, Phone, Mail, Building, Trash2, Star } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const submissionData = {
  id: 1,
  yearbook: "Chambers Global 2025",
  area: "Corporate/M&A",
  year: "2025",
  deadline: "2024-03-15",
  researchStart: "2024-05-01",
  researchEnd: "2024-07-31",
  status: "Em preparação",
  maxReferees: 20,
  description: "Submissão para a seção Corporate/M&A do Chambers Global 2025, cobrindo transações de fusões e aquisições no Brasil."
};

const currentReferees = [
  {
    id: 1,
    name: "João Silva",
    position: "CEO",
    company: "Tech Solutions Ltda",
    email: "joao.silva@techsolutions.com",
    phone: "+55 11 99999-9999",
    status: "Pendente",
    interactionHours: 120,
    lastContact: "2024-01-15",
    conflicts: [],
    priority: "high"
  },
  {
    id: 2,
    name: "Maria Santos",
    position: "Diretora Jurídica",
    company: "Banco Nacional",
    email: "maria.santos@banconacional.com",
    phone: "+55 11 88888-8888",
    status: "Respondido",
    interactionHours: 95,
    lastContact: "2024-01-20",
    conflicts: [],
    priority: "high"
  },
  {
    id: 3,
    name: "Pedro Costa",
    position: "General Counsel",
    company: "Indústria ABC",
    email: "pedro.costa@industriaabc.com",
    phone: "+55 11 77777-7777",
    status: "Não respondeu",
    interactionHours: 75,
    lastContact: "2023-12-10",
    conflicts: ["The Legal 500 2024 - Tributário"],
    priority: "medium"
  }
];

const recommendedReferees = [
  {
    id: 4,
    name: "Ana Oliveira",
    position: "VP Legal",
    company: "StartupCorp",
    email: "ana.oliveira@startupcorp.com",
    phone: "+55 11 66666-6666",
    interactionHours: 150,
    lastContact: "2024-02-01",
    reason: "Maior número de horas registradas na área (150h)",
    score: 95
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    position: "Diretor de Compliance",
    company: "MegaCorp Brasil",
    email: "carlos.ferreira@megacorp.com",
    phone: "+55 11 55555-5555",
    interactionHours: 85,
    lastContact: "2024-01-25",
    reason: "Alto relacionamento recente com a área",
    score: 88
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Respondido":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "Não respondeu":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-warning" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Respondido":
      return "default" as const;
    case "Não respondeu":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return <Star className="h-4 w-4 text-warning fill-current" />;
    case "medium":
      return <Star className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

export default function SubmissionDetail() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredReferees = currentReferees.filter(referee => 
    selectedStatus === "all" || referee.status === selectedStatus
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath="/submissions" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">
                  {submissionData.yearbook}
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{submissionData.area}</Badge>
                  <Badge variant="secondary">{submissionData.year}</Badge>
                  <Badge variant="secondary">
                    {currentReferees.length}/{submissionData.maxReferees} referees
                  </Badge>
                </div>
              </div>
            </div>

            {/* Submission Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Informações da Submissão</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Deadline</label>
                  <p className="text-sm font-medium">{new Date(submissionData.deadline).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Período de Pesquisa</label>
                  <p className="text-sm font-medium">
                    {new Date(submissionData.researchStart).toLocaleDateString('pt-BR')} - {new Date(submissionData.researchEnd).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant="secondary" className="mt-1">{submissionData.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Tabs defaultValue="referees" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="referees">Referees Atuais</TabsTrigger>
                <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
                <TabsTrigger value="analysis">Análises</TabsTrigger>
              </TabsList>

              <TabsContent value="referees" className="space-y-6">
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Respondido">Respondido</SelectItem>
                        <SelectItem value="Não respondeu">Não respondeu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Referee
                  </Button>
                </div>

                {/* Referees List */}
                <div className="grid gap-4">
                  {filteredReferees.map((referee) => (
                    <Card key={referee.id} className="shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            {/* Header */}
                            <div className="flex items-start space-x-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-semibold text-foreground">{referee.name}</h3>
                                  {getPriorityIcon(referee.priority)}
                                  {getStatusIcon(referee.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{referee.position}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Building className="h-3 w-3 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">{referee.company}</p>
                                </div>
                              </div>
                              <Badge variant={getStatusBadge(referee.status)}>
                                {referee.status}
                              </Badge>
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
                            <div className="grid gap-4 md:grid-cols-3 pt-2 border-t">
                              <div>
                                <label className="text-xs text-muted-foreground">Horas de Interação</label>
                                <p className="text-sm font-medium">{referee.interactionHours}h</p>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">Último Contato</label>
                                <p className="text-sm font-medium">{new Date(referee.lastContact).toLocaleDateString('pt-BR')}</p>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">Conflitos</label>
                                <p className="text-sm font-medium">
                                  {referee.conflicts.length === 0 ? (
                                    <span className="text-success">Nenhum</span>
                                  ) : (
                                    <span className="text-destructive">{referee.conflicts.length}</span>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Conflicts */}
                            {referee.conflicts.length > 0 && (
                              <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <AlertTriangle className="h-4 w-4 text-destructive" />
                                  <span className="text-sm font-medium text-destructive">Conflitos Detectados</span>
                                </div>
                                {referee.conflicts.map((conflict, index) => (
                                  <p key={index} className="text-sm text-destructive/80">• {conflict}</p>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Referees Recomendados</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Baseado nos dados de timesheet e interações da área Corporate/M&A
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendedReferees.map((referee) => (
                      <div key={referee.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-subtle">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground">{referee.name}</h4>
                            <Badge variant="outline">Score: {referee.score}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{referee.position} - {referee.company}</p>
                          <p className="text-xs text-success">{referee.reason}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>{referee.interactionHours}h de interação</span>
                            <span>Último contato: {new Date(referee.lastContact).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Taxa de Resposta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground mb-2">66.7%</div>
                      <p className="text-sm text-muted-foreground">2 de 3 referees responderam</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Respondido</span>
                          <span className="text-success">1 referee</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pendente</span>
                          <span className="text-warning">1 referee</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Não respondeu</span>
                          <span className="text-destructive">1 referee</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Distribuição por Prioridade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-warning fill-current" />
                            <span className="text-sm">Alta prioridade</span>
                          </div>
                          <span className="text-sm font-medium">2 referees</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Média prioridade</span>
                          </div>
                          <span className="text-sm font-medium">1 referee</span>
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