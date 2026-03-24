import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Save, Loader2, Camera } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setFullName(data.full_name || "");
        setDisplayName(data.display_name || "");
        setAvatarUrl(data.avatar_url || "");
      }
    };
    loadProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        display_name: displayName,
        avatar_url: avatarUrl || null,
      })
      .eq("user_id", user.id);

    if (!error) {
      await supabase.auth.updateUser({ data: { full_name: fullName } });
      toast({ title: "¡Perfil actualizado!", description: "Tus datos se guardaron correctamente." });
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "La nueva contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (!error) {
      toast({ title: "¡Contraseña actualizada!", description: "Tu contraseña se cambió correctamente." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setChangingPassword(false);
  };

  const initial = (fullName || displayName || user?.email || "U")[0].toUpperCase();

  return (
    <Layout>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            Mi Perfil
          </h1>

          {/* Avatar & Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-primary/30" />
                ) : (
                  <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center">
                    <span className="font-display text-3xl font-bold text-primary-foreground">{initial}</span>
                  </div>
                )}
                <div>
                  <p className="font-display font-semibold text-lg">{fullName || displayName || "Sin nombre"}</p>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre completo" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="displayName">Nombre de Usuario</Label>
                  <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nombre público" maxLength={50} />
                </div>
                <div>
                  <Label htmlFor="avatarUrl">URL de Avatar</Label>
                  <Input id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://ejemplo.com/foto.jpg" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={user?.email || ""} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground mt-1">El email no se puede cambiar.</p>
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={saving} className="gradient-primary w-full font-semibold">
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Cambiar Contraseña
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres" minLength={6} />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Label>
                <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Repite la nueva contraseña" />
              </div>
              <Button onClick={handleChangePassword} disabled={changingPassword} variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 font-semibold">
                {changingPassword ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Lock className="h-4 w-4 mr-2" />}
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
