import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useActivityLog } from "@/hooks/useActivityLog";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, Briefcase, Settings, Shield, BarChart3, Activity, Clock, Eye } from "lucide-react";

interface UserProfile {
  user_id: string;
  display_name: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const { logActivity } = useActivityLog();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "activity">("overview");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    logActivity("admin_dashboard_visit", "Admin visited the dashboard");
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingData(true);
    const [profilesRes, logsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(50),
    ]);
    if (profilesRes.data) setUsers(profilesRes.data);
    if (logsRes.data) setActivities(logsRes.data);
    setLoadingData(false);
  };

  const stats = [
    { title: "Usuarios Totales", value: users.length.toString(), icon: Users, color: "text-primary" },
    { title: "Actividades Hoy", value: activities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString()).length.toString(), icon: Activity, color: "text-primary" },
    { title: "Último Registro", value: users[0] ? new Date(users[0].created_at).toLocaleDateString("es") : "N/A", icon: Clock, color: "text-primary" },
    { title: "Total Actividades", value: activities.length.toString(), icon: BarChart3, color: "text-primary" },
  ];

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const getUserName = (userId: string) => {
    const u = users.find(u => u.user_id === userId);
    return u?.full_name || u?.display_name || userId.slice(0, 8) + "...";
  };

  return (
    <Layout>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Panel de Administración
              </h1>
              <p className="text-muted-foreground mt-1">
                Bienvenido, {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
            <Badge className="gradient-accent text-accent-foreground px-3 py-1 text-sm font-semibold">
              {role?.toUpperCase()}
            </Badge>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-border pb-2 overflow-x-auto">
            {[
              { id: "overview" as const, label: "Resumen", icon: BarChart3 },
              { id: "users" as const, label: "Usuarios", icon: Users },
              { id: "activity" as const, label: "Actividad", icon: Activity },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? "gradient-primary" : "text-muted-foreground"}
              >
                <tab.icon className="h-4 w-4 mr-1.5" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Stats - always visible */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <Card key={s.title} className="hover:glow-cyan transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
                  <s.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${s.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-display font-bold">{s.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Gestión de Usuarios", desc: "Administra cuentas, roles y permisos.", onClick: () => setActiveTab("users") },
                { icon: Activity, title: "Monitor de Actividad", desc: "Vigila las acciones de los usuarios en tiempo real.", onClick: () => setActiveTab("activity") },
                { icon: FileText, title: "Gestión de Blog", desc: "Crea, edita y publica artículos." },
                { icon: Briefcase, title: "Gestión de Proyectos", desc: "Administra el portafolio de trabajos." },
                { icon: Settings, title: "Configuración", desc: "Ajustes generales del sitio." },
                { icon: Shield, title: "Seguridad", desc: "Logs de acceso y configuración." },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="cursor-pointer hover:glow-cyan transition-all hover:scale-[1.02]"
                  onClick={item.onClick}
                >
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-primary mb-3" />
                    <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Usuarios Registrados ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <p className="text-muted-foreground text-center py-8">Cargando usuarios...</p>
                ) : users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No hay usuarios registrados aún.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead className="hidden sm:table-cell">ID</TableHead>
                          <TableHead>Registrado</TableHead>
                          <TableHead className="hidden md:table-cell">Avatar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.user_id}>
                            <TableCell className="font-medium">
                              {u.full_name || u.display_name || "Sin nombre"}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-xs text-muted-foreground font-mono">
                              {u.user_id.slice(0, 12)}...
                            </TableCell>
                            <TableCell className="text-sm">{formatDate(u.created_at)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {u.avatar_url ? (
                                <img src={u.avatar_url} alt="" className="h-8 w-8 rounded-full" />
                              ) : (
                                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold" style={{ color: 'hsl(0 0% 100%)' }}>
                                  {(u.full_name || u.display_name || "?")[0].toUpperCase()}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Registro de Actividades
                </CardTitle>
                <Button size="sm" variant="outline" onClick={fetchData} className="border-primary/30 text-primary hover:bg-primary/10">
                  Actualizar
                </Button>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <p className="text-muted-foreground text-center py-8">Cargando actividades...</p>
                ) : activities.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No hay actividades registradas aún.</p>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {activities.map((a) => (
                      <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <Activity className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{getUserName(a.user_id)}</span>
                            <Badge variant="secondary" className="text-xs">{a.action}</Badge>
                          </div>
                          {a.details && <p className="text-xs text-muted-foreground mt-1 truncate">{a.details}</p>}
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(a.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
