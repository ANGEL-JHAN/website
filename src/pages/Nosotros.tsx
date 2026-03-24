import Layout from "@/components/Layout";
import { Users, Target, Award, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Misión", desc: "Transformar ideas en experiencias digitales que generen resultados reales para nuestros clientes." },
  { icon: Award, title: "Calidad", desc: "Cada línea de código y cada pixel de diseño refleja nuestro compromiso con la excelencia." },
  { icon: Heart, title: "Pasión", desc: "Amamos lo que hacemos y eso se refleja en cada proyecto que entregamos." },
  { icon: Users, title: "Equipo", desc: "Un grupo diverso de diseñadores, desarrolladores y estrategas digitales." },
];

const team = [
  { name: "Carlos Méndez", role: "Director Creativo" },
  { name: "Ana García", role: "Desarrolladora Frontend" },
  { name: "Luis Torres", role: "Desarrollador Backend" },
  { name: "María López", role: "Diseñadora UX/UI" },
];

const Nosotros = () => (
  <Layout>
    {/* Hero */}
    <section className="py-20 gradient-navy">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(0 0% 100%)' }}>
          Sobre <span className="text-gradient">Nosotros</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg" style={{ color: 'hsl(220 15% 65%)' }}>
          Somos una agencia de desarrollo web apasionada por crear soluciones digitales innovadoras que impulsan el crecimiento de nuestros clientes.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-lg p-6 text-center hover:glow-cyan transition-shadow">
              <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                <span className="font-display text-2xl font-bold" style={{ color: 'hsl(0 0% 100%)' }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-display font-semibold">{t.name}</h3>
              <p className="text-muted-foreground text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Nosotros;
