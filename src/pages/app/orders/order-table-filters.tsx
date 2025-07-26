import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'

const OrderTableFilters = () => {
  return (
    <form action="" className='flex items-center gap-2'>
      <span className='text-sm font-semibold'>Filtros:</span>
      <Input placeholder='ID do pedido' className='h-8 w-auto' />
      <Input placeholder='Nome do cliente' className='h-8 w-[320px]' />
      <Select defaultValue='all'>
        <SelectTrigger className='h-8 w-[180px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todos status</SelectItem>
          <SelectItem value='pending'>Pendente</SelectItem>
          <SelectItem value='canceling'>Cancelado</SelectItem>
          <SelectItem value='processing'>Empreparo</SelectItem>
          <SelectItem value='delivering'>Em entrega</SelectItem>
          <SelectItem value='devilered'>Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button type='submit' variant={'secondary'} size={'xs'} >
        <Search className='w-4 h-4 ' />
        Filtrar resultados
      </Button>

      <Button type='button' variant={'outline'} size={'xs'} >
        <X className='w-4 h-4 ' />
        Remover filtros
      </Button>
    </form>
  )
}

export default OrderTableFilters
