import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Smartphone, Palette, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Globe, title: "Sitios Web", desc: "Páginas web modernas, rápidas y optimizadas para tu negocio." },
  { icon: Smartphone, title: "Apps Responsivas", desc: "Diseños que se adaptan perfectamente a cualquier dispositivo." },
  { icon: Palette, title: "Diseño UI/UX", desc: "Interfaces intuitivas que enamoran a tus usuarios." },
  { icon: Zap, title: "Rendimiento", desc: "Optimización de velocidad y SEO para máximos resultados." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Web development" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-navy opacity-80" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: 'hsl(0 0% 100%)' }}>
            Creamos sitios web que <span className="text-gradient">impulsan</span> tu negocio
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'hsl(220 15% 70%)' }}>
            Diseño, desarrollo y estrategia digital para llevar tu marca al siguiente nivel.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/trabajos">
              <Button size="lg" className="gradient-primary font-semibold text-base">
                Ver Proyectos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/nosotros">
              <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-semibold text-base">
                Conócenos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Nuestros Servicios</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Todo lo que necesitas para una presencia digital excepcional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="bg-card rounded-lg p-6 border border-border hover:glow-cyan transition-shadow duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <s.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 gradient-navy">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'hsl(0 0% 100%)' }}>
          ¿Listo para empezar?
        </h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'hsl(220 15% 65%)' }}>
          Únete y descubre cómo podemos transformar tu presencia digital.
        </p>
        <Link to="/auth">
          <Button size="lg" className="gradient-primary font-semibold text-base">
            Crear Cuenta Gratis <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
