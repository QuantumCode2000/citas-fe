import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Login</CardTitle>
          <CardDescription>
            Ingrese su Usuario y Contraseña
            <br /> para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Al hacer clic en iniciar sesión, aceptas nuestros{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Politica de Privacidad
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
