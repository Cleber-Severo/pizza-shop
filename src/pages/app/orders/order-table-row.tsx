import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import OrderDetails from "./order-details";
import { OrderStatus } from "@/components/order-status";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

interface OrderTableRow {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

const OrderTableRow = ({ order }: OrderTableRow) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cachedKey, cachedData]) => {
      if (!cachedData) return;

      queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
        ...cachedData,
        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isAprovingorder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"} size="xs" className="cursor-pointer">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </TableCell>
      <TableCell>
        {order.status === "processing" && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            variant={"outline"}
            size={"xs"}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-0 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            variant={"outline"}
            size={"xs"}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-0 h-3 w-3" />
            Entregue
          </Button>
        )}
        {order.status === "pending" && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            variant={"outline"}
            size={"xs"}
            disabled={isAprovingorder}
          >
            <ArrowRight className="mr-0 h-3 w-3" />
            Aprovar
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-0 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
