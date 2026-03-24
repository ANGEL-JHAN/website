import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  { name: "E-Commerce Premium", category: "Tienda Online", desc: "Plataforma de comercio electrónico con pasarela de pagos integrada.", tech: ["React", "Node.js", "Stripe"] },
  { name: "Dashboard Analytics", category: "App Web", desc: "Panel de control en tiempo real para gestión de métricas empresariales.", tech: ["React", "D3.js", "PostgreSQL"] },
  { name: "Restaurant App", category: "Landing Page", desc: "Sitio web interactivo con reservas online y menú digital.", tech: ["Next.js", "Tailwind"] },
  { name: "Fitness Tracker", category: "App Móvil", desc: "Aplicación de seguimiento de ejercicios con rutinas personalizadas.", tech: ["React Native", "Firebase"] },
  { name: "Corporate Site", category: "Sitio Web", desc: "Página corporativa con blog integrado y formularios de contacto.", tech: ["React", "CMS", "SEO"] },
  { name: "SaaS Platform", category: "App Web", desc: "Plataforma SaaS de gestión de proyectos para equipos remotos.", tech: ["TypeScript", "Supabase"] },
];

const Trabajos = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-2">Nuestros Trabajos</h1>
        <p className="text-muted-foreground mb-12">Proyectos que hablan por sí solos.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:glow-cyan transition-all duration-300"
            >
              <div className="h-48 gradient-navy flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  {p.name}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Trabajos;
