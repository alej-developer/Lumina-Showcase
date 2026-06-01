'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Link } from '@nextui-org/react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Error al iniciar sesión');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-md shadow-2xl border-none">
        <CardHeader className="flex flex-col gap-1 items-center justify-center pt-8 pb-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Lúmina
          </h1>
          <p className="text-default-500 text-sm mt-2">Inicia sesión en tu cuenta</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              autoFocus
              endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              label="Correo electrónico"
              placeholder="Ingresa tu correo"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              isRequired
              classNames={{
                inputWrapper: "border-default-200 hover:border-primary focus-within:border-primary"
              }}
            />
            <Input
              endContent={<Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              classNames={{
                inputWrapper: "border-default-200 hover:border-primary focus-within:border-primary"
              }}
            />
            {error && <p className="text-danger text-sm text-center font-medium">{error}</p>}
            <Button 
              color="primary" 
              className="mt-4 bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg"
              type="submit"
              isLoading={loading}
              startContent={!loading && <LogIn size={18} />}
              size="lg"
            >
              Entrar
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-center gap-2 pb-8 pt-2">
          <Link href="/forgot-password" size="sm" color="foreground" className="hover:text-primary transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="text-sm text-default-500">
            ¿No tienes cuenta? <Link href="/register" size="sm" color="primary" className="font-semibold">Regístrate</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
