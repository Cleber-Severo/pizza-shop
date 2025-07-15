import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Helmet, } from 'react-helmet-async';



export function SignIn() {
  return (
    <div>
      <Helmet title='Login' />
      <div className='p-8'>
        <div className='w-[358px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col text-center gap-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>Acessar painel</h1>
            <p className='text-sm text-muted-foreground'>Acompanhe suas vendas pelo painel d parceiro!</p>
          </div>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'> Seu e-mail</Label>
              <Input id='email' type='email' />
            </div>
            <Button type='submit' className='w-full'>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}