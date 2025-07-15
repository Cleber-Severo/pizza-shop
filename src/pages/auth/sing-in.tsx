import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Helmet, } from 'react-helmet-async';
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(() => resolve, 2000))
  }

  return (
    <div>
      <Helmet title='Login' />
      <div className='p-8'>
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