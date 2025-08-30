import { http, HttpResponse } from "msw";
import type { ApproveOrderParams } from "../approve-order";

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  "/orders/:ordersId/approve",
  ({ params }) => {
    if (params.orderId === "error-order-ir") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
