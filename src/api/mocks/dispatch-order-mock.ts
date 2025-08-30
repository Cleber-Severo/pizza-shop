import { http, HttpResponse } from "msw";
import type { DispatchOrderParams } from "../dispatch-order";

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  "/orders/:ordersId/dispatch",
  ({ params }) => {
    if (params.orderId === "error-order-ir") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
