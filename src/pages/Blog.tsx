import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const posts = [
  { title: "Tendencias de Diseño Web 2025", tag: "Diseño", date: "15 Mar 2026", excerpt: "Descubre las últimas tendencias en diseño web que dominarán este año." },
  { title: "SEO para Principiantes", tag: "SEO", date: "10 Mar 2026", excerpt: "Guía completa para optimizar tu sitio web y aparecer en Google." },
  { title: "React vs Vue: ¿Cuál elegir?", tag: "Desarrollo", date: "5 Mar 2026", excerpt: "Comparativa detallada entre los frameworks más populares." },
  { title: "La importancia del UX", tag: "UX", date: "1 Mar 2026", excerpt: "Por qué la experiencia de usuario define el éxito de tu proyecto." },
  { title: "Cómo optimizar imágenes web", tag: "Performance", date: "25 Feb 2026", excerpt: "Técnicas para reducir el peso de tus imágenes sin perder calidad." },
  { title: "APIs REST vs GraphQL", tag: "Backend", date: "20 Feb 2026", excerpt: "Ventajas y desventajas de cada enfoque para tu próximo proyecto." },
];

const Blog = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-12">Artículos, tutoriales y novedades del mundo web.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.title} className="hover:glow-cyan transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">{post.tag}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                </div>
                <CardTitle className="font-display text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
