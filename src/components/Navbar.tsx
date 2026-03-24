import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2, LogOut, UserCircle } from "lucide-react";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/blog", label: "Blog" },
  { to: "/trabajos", label: "Trabajos" },
  { to: "/nosotros", label: "Nosotros" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-navy border-b border-navy-light/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-primary-foreground" style={{ color: 'hsl(0 0% 100%)' }}>
            WebCraft
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
              style={location.pathname !== link.to ? { color: 'hsl(220 15% 70%)' } : undefined}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  <UserCircle className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut} className="border-primary/30 text-primary hover:bg-primary/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gradient-primary font-semibold">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'hsl(0 0% 100%)' }}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden gradient-navy border-t border-navy-light/50 pb-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.to ? "text-primary" : ""
              }`}
              style={location.pathname !== link.to ? { color: 'hsl(220 15% 70%)' } : undefined}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full gradient-primary font-semibold mb-2">Dashboard</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => { signOut(); setOpen(false); }} className="w-full border-primary/30 text-primary">
                <LogOut className="h-4 w-4 mr-1" /> Salir
              </Button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full gradient-primary font-semibold">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
