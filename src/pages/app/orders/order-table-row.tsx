import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableRow, TableCell } from '@/components/ui/table'
import { Search, ArrowRight, X } from 'lucide-react'
import OrderDetails from './order-details'

const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size='xs' className='cursor-pointer'>
              <Search className='w-3 h-3' />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className='font-mono text-xs font-medium'>v42efg24t24</TableCell>
      <TableCell className='text-muted-foreground'>
        há 15 minutos
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-slate-400' />
          <span className='text-muted-foreground font-medium'>Pendente</span>
        </div>
      </TableCell>
      <TableCell className='font-medium'>
        Cléber Severo dos Santos
      </TableCell>
      <TableCell className='font-medium'>
        R$ 149,90
      </TableCell>
      <TableCell>
        <Button variant={'outline'} size={'xs'}>
          <ArrowRight className='w-3 h-3 mr-2 ' />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'xs'}>
          <X className='w-3 h-3 mr-2 ' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default OrderTableRow
