import { http, HttpResponse } from "msw";
import type { DeliverOrderParams } from "../deliver-order";

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  "/orders/:ordersId/deliver",
  ({ params }) => {
    if (params.orderId === "error-order-ir") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
