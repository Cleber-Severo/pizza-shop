import { http, HttpResponse } from "msw";
import type {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "999999999",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 3299,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1299,
        product: {
          name: "Pizza Margherita",
        },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 2000,
        product: {
          name: "Pizza Mussarella",
        },
        quantity: 1,
      },
    ],
  });
});
