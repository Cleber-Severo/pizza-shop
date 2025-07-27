import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const OrderDetails = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 1234135</DialogTitle>
        <DialogDescription>
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>

      <div className='space-y-6'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='text-muted-foreground'>Status</TableCell>
              <TableCell className='flex justify-end'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-slate-400' />
                  <span className='text-muted-foreground font-medium'>Pendente</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Cliente</TableCell>
              <TableCell className='flex justify-end'>
                <span className='text-muted-foreground font-medium'>Teste da silva</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Telefone</TableCell>
              <TableCell className='flex justify-end'>
                <span className='text-muted-foreground font-medium'>(11) 99999-9999</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Email</TableCell>
              <TableCell className='flex justify-end'>
                <span className='text-muted-foreground font-medium'>teste@email.com</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Realizado há</TableCell>
              <TableCell className='flex justify-end'>
                <span className='text-muted-foreground font-medium'>há 3 minutos</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-right'>Produto</TableHead>
              <TableHead className='text-right'>Quantidade</TableHead>
              <TableHead className='text-right'>Preço</TableHead>
              <TableHead className='text-right'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Pizza pepperoni família</TableCell>
              <TableCell className='text-right'>2</TableCell>
              <TableCell className='text-right'>R$ 69,99</TableCell>
              <TableCell className='text-right'>R$ 139,80</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Pizza Mussarela família</TableCell>
              <TableCell className='text-right'>2</TableCell>
              <TableCell className='text-right'>R$ 59,99</TableCell>
              <TableCell className='text-right'>R$ 119,80</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className='text-right'>R$ 259,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}

export default OrderDetails
