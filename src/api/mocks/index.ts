import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { SignInMock } from "./sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getDaysOrdersAmountMock } from "./get-day-orders-amount";
import { getMonthsOrdersAmountMock } from "./get-month-orders-amount copy";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getMonthCanceledsOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getOrdersMock } from "./get-order-mock";
import { getProfileMock } from "./get-profile-mock";
import { getOrderDetailsMock } from "./get-order-details-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant";
import { updateProfileMock } from "./update-profile-mock";
import { approveOrderMock } from "./approve-order-mock";
import { cancelOrderMock } from "./cancel-order-mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispatch-order-mock";

export const worker = setupWorker(
  SignInMock,
  registerRestaurantMock,
  getDaysOrdersAmountMock,
  getDailyRevenueInPeriodMock,
  getMonthsOrdersAmountMock,
  getMonthCanceledsOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getOrdersMock,
  getProfileMock,
  getOrderDetailsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
