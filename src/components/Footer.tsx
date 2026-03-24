import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="gradient-navy border-t border-navy-light/50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold" style={{ color: 'hsl(0 0% 100%)' }}>WebCraft</span>
          </div>
          <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>
            Creamos experiencias digitales excepcionales para impulsar tu negocio.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3" style={{ color: 'hsl(0 0% 100%)' }}>Navegación</h4>
          <div className="space-y-2">
            {[{ to: "/", l: "Inicio" }, { to: "/blog", l: "Blog" }, { to: "/trabajos", l: "Trabajos" }, { to: "/nosotros", l: "Nosotros" }].map(n => (
              <Link key={n.to} to={n.to} className="block text-sm hover:text-primary transition-colors" style={{ color: 'hsl(220 15% 55%)' }}>{n.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3" style={{ color: 'hsl(0 0% 100%)' }}>Contacto</h4>
          <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>info@webcraft.dev</p>
          <p className="text-sm mt-1" style={{ color: 'hsl(220 15% 55%)' }}>+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-navy-light/30 text-center text-sm" style={{ color: 'hsl(220 15% 45%)' }}>
        © {new Date().getFullYear()} WebCraft. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
