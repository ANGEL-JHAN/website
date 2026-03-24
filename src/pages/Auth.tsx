import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable";
import { useCaptcha } from "@/hooks/useCaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Mail, Lock, User, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const captcha = useCaptcha();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      if (!fullName.trim()) {
        toast({ title: "Error", description: "El nombre es obligatorio.", variant: "destructive" });
        return;
      }
      if (password !== confirmPassword) {
        toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
        return;
      }
      if (password.length < 6) {
        toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
        return;
      }
      if (!captcha.verify()) {
        toast({ title: "Error", description: "La verificación CAPTCHA es incorrecta.", variant: "destructive" });
        captcha.regenerate();
        return;
      }
      if (!acceptTerms) {
        toast({ title: "Error", description: "Debes aceptar los términos y condiciones.", variant: "destructive" });
        return;
      }
    }

    setLoading(true);
    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (!isLogin) {
      toast({ title: "¡Cuenta creada!", description: "Revisa tu correo para confirmar tu cuenta." });
    } else {
      navigate("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: "Error", description: String(result.error), variant: "destructive" });
      setLoading(false);
    }
  };

  const inputStyle = { color: 'hsl(0 0% 100%)' };
  const labelStyle = { color: 'hsl(220 15% 70%)' };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-navy-light/50 bg-navy-light/50 backdrop-blur-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-3">
            <Code2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl" style={{ color: 'hsl(0 0% 100%)' }}>
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription style={{ color: 'hsl(220 15% 55%)' }}>
            {isLogin ? "Accede a tu cuenta de WebCraft" : "Completa tus datos para unirte"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/10"
            style={inputStyle}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-navy-light/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2" style={{ backgroundColor: 'hsl(220 25% 18%)', color: 'hsl(220 15% 55%)' }}>o con email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name field - only for registration */}
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="fullName" style={labelStyle}>
                  <User className="h-4 w-4 inline mr-1" /> Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Pérez"
                  required={!isLogin}
                  maxLength={100}
                  className="bg-navy/50 border-navy-light/50"
                  style={inputStyle}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" style={labelStyle}>
                <Mail className="h-4 w-4 inline mr-1" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                maxLength={255}
                className="bg-navy/50 border-navy-light/50"
                style={inputStyle}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" style={labelStyle}>
                <Lock className="h-4 w-4 inline mr-1" /> Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                className="bg-navy/50 border-navy-light/50"
                style={inputStyle}
              />
            </div>

            {/* Confirm password - only for registration */}
            {!isLogin && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" style={labelStyle}>
                    <Lock className="h-4 w-4 inline mr-1" /> Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    required
                    minLength={6}
                    className="bg-navy/50 border-navy-light/50"
                    style={inputStyle}
                  />
                </div>

                {/* CAPTCHA */}
                <div className="rounded-lg border border-primary/20 bg-navy/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium" style={labelStyle}>Verificación de seguridad</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-center py-2 rounded bg-navy/50 border border-navy-light/30">
                      <span className="font-display text-lg font-bold text-primary">{captcha.challenge.question}</span>
                    </div>
                    <button type="button" onClick={captcha.regenerate} className="text-primary hover:text-primary/80 transition-colors">
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                  <Input
                    type="number"
                    value={captcha.userAnswer}
                    onChange={(e) => captcha.setUserAnswer(e.target.value)}
                    placeholder="Tu respuesta"
                    className={`bg-navy/50 border-navy-light/50 ${captcha.error ? 'border-destructive' : ''} ${captcha.verified ? 'border-primary' : ''}`}
                    style={inputStyle}
                    required
                  />
                  {captcha.error && <p className="text-xs text-destructive">Respuesta incorrecta. Intenta de nuevo.</p>}
                  {captcha.verified && <p className="text-xs text-primary">✓ Verificado correctamente</p>}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(c) => setAcceptTerms(c === true)}
                    className="mt-0.5 border-primary/40 data-[state=checked]:bg-primary"
                  />
                  <Label htmlFor="terms" className="text-xs cursor-pointer leading-tight" style={{ color: 'hsl(220 15% 55%)' }}>
                    Acepto los términos y condiciones y la política de privacidad
                  </Label>
                </div>
              </>
            )}

            <Button type="submit" className="w-full gradient-primary font-semibold" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
          </form>

          <p className="text-center text-sm" style={{ color: 'hsl(220 15% 55%)' }}>
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button onClick={() => { setIsLogin(!isLogin); captcha.regenerate(); }} className="text-primary font-medium hover:underline">
              {isLogin ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
