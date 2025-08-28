import { http, HttpResponse } from "msw";

import type { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "2023-01-01", receipt: 1000 },
    { date: "2023-01-02", receipt: 200 },
    { date: "2023-01-03", receipt: 4000 },
    { date: "2023-01-04", receipt: 1500 },
    { date: "2023-01-05", receipt: 5600 },
    { date: "2023-01-06", receipt: 900 },
    { date: "2023-01-07", receipt: 1462 },
  ]);
});
