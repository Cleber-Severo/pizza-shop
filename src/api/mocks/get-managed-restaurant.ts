import { http, HttpResponse } from "msw";
import type { GetManagedRestaurantResponse } from "../get-managed-restaurante";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-user-id",
    managerId: "custom-manager-id",
    description: "Custom restaurant description",
    name: "John Doe",
    createdAt: new Date(),
    updatedAt: null,
  });
});
