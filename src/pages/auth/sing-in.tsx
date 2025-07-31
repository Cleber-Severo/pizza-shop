import { signIn } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { Helmet, } from 'react-helmet-async';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })


  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)
      await authenticate({ email: data.email })
      // await new Promise((resolve) => setTimeout(resolve, 2000))


      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data)
        }
      })
    } catch (error) {

      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div>
      <Helmet title='Login' />
      <div className='p-8'>
        <Button variant={'ghost'} asChild className='absolute right-8 top-8'>
          <Link to='/sign-up'>Novo estabelecimento</Link>
        </Button>

        <div className='w-[358px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col text-center gap-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>Acessar painel</h1>
            <p className='text-sm text-muted-foreground'>Acompanhe suas vendas pelo painel d parceiro!</p>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
            <div className='space-y-2'>
              <Label htmlFor='email'> Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}