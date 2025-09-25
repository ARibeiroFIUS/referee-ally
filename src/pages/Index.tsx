import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentSubmissions } from "@/components/dashboard/RecentSubmissions";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar currentPath="/" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Visão geral das submissões e prazos dos anuários jurídicos
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <RecentSubmissions />
              </div>
              <div className="space-y-6">
                <UpcomingDeadlines />
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
