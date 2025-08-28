import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { SignInMock } from "./sign-in-mock";

export const worker = setupWorker(SignInMock);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
