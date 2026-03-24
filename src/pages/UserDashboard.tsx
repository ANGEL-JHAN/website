import { useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useActivityLog } from "@/hooks/useActivityLog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, FileText, Briefcase, Star, Clock, ArrowRight, Layout as LayoutIcon, MessageSquare } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const { logActivity } = useActivityLog();

  useEffect(() => {
    logActivity("dashboard_visit", "User visited their dashboard");
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";

  return (
    <Layout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="gradient-navy rounded-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold" style={{ color: 'hsl(0 0% 100%)' }}>
                  ¡Hola, {displayName}! 👋
                </h1>
                <p className="mt-1" style={{ color: 'hsl(220 15% 65%)' }}>
                  Bienvenido a tu panel de control personal.
                </p>
              </div>
              <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold shrink-0">
                {role?.toUpperCase() || "USER"}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="hover:glow-cyan transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mis Proyectos</CardTitle>
                <Briefcase className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">proyectos contratados</p>
              </CardContent>
            </Card>
            <Card className="hover:glow-cyan transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Favoritos</CardTitle>
                <Star className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">artículos guardados</p>
              </CardContent>
            </Card>
            <Card className="hover:glow-cyan transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Miembro Desde</CardTitle>
                <Clock className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-display font-bold">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" }) : "Hoy"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">fecha de registro</p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Mi Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="" className="h-16 w-16 rounded-full" />
                ) : (
                  <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
                    <span className="font-display text-2xl font-bold" style={{ color: 'hsl(0 0% 100%)' }}>
                      {displayName[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-display font-semibold text-lg">{displayName}</h3>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">Plan Gratuito</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <h2 className="font-display text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: User, title: "Mi Perfil", desc: "Edita tu nombre y contraseña.", to: "/profile" },
              { icon: Briefcase, title: "Ver Proyectos", desc: "Explora nuestro portafolio.", to: "/trabajos" },
              { icon: FileText, title: "Leer Blog", desc: "Artículos y tutoriales.", to: "/blog" },
              { icon: LayoutIcon, title: "Nuestros Servicios", desc: "Lo que ofrecemos.", to: "/" },
              { icon: MessageSquare, title: "Contacto", desc: "Habla con nosotros.", to: "/nosotros" },
            ].map((item) => (
              <Link key={item.title} to={item.to} onClick={() => logActivity("navigate", `Navigated to ${item.to}`)}>
                <Card className="h-full hover:glow-cyan transition-all hover:scale-[1.02] cursor-pointer">
                  <CardContent className="pt-5 pb-4">
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-display font-semibold mb-0.5">{item.title}</h3>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserDashboard;
