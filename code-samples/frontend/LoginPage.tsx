'use client';

import { useState } from 'react';
import { Button, Input, Link, Spinner } from '@heroui/react';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Pantalla de inicio de sesión.
 *
 * Diseño sobrio de Lumina: panel de marca en azul marino y formulario
 * limpio sobre fondo neutro. Sin gradientes ni efectos de brillo:
 * la confianza la da la claridad, no el neón.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Correo o contraseña incorrectos.');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('No se puede conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel de marca: azul marino plano, sin efectos */}
      <aside className="hidden flex-col justify-between bg-[#0f2a43] p-12 text-white lg:flex">
        <span className="text-sm font-semibold tracking-[0.12em]">LUMINA</span>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold leading-tight">
            Diagnóstico financiero claro para tu negocio.
          </h2>
          <p className="text-white/70">
            Importa tus extractos, detecta riesgos a tiempo y decide con criterio.
          </p>
        </div>
        <span className="text-xs text-white/50">Datos bancarios clasificados con tus reglas.</span>
      </aside>

      {/* Formulario */}
      <main className="flex items-center justify-center bg-background p-6">
        <form onSubmit={handleLogin} className="flex w-full max-w-sm flex-col gap-4" noValidate>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">Inicia sesión</h1>
            <p className="text-sm text-muted">Accede a tu panel de diagnóstico financiero.</p>
          </div>

          <Input
            type="email"
            label="Correo electrónico"
            placeholder="nombre@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" variant="primary" isDisabled={loading} className="mt-2">
            {loading ? <Spinner size="sm" /> : <LogIn className="size-4" />}
            Entrar
          </Button>

          <p className="text-center text-sm text-muted">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-medium text-accent">
              Crea una cuenta
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
