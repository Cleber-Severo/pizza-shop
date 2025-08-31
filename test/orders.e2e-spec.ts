import { test, expect } from "@playwright/test";

test("List orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-10", exact: true }),
  ).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  await expect(
    page.getByRole("cell", { name: "order-11", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-20", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Última página" }).click();

  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Página anterior" }).click();
  await page.waitForTimeout(1000);

  await expect(
    page.getByRole("cell", { name: "order-51", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-60", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Primeira página" }).click();

  await expect(
    page.getByRole("cell", { name: "order-1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "order-10", exact: true }),
  ).toBeVisible();
});

test("filter by order ID", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "ID do pedido" }).fill("order-11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "order-11" })).toBeVisible();

  await page.waitForTimeout(1000);
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do cliente" })
    .fill("Customer 11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "order-11" })).toBeVisible();

  await page.waitForTimeout(1000);
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();

  await page.getByLabel("Pendente").click();
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  const tableRows = await page.getByRole("cell", { name: "Pendente" }).all();

  await expect(tableRows.length).toBeGreaterThan(0);

  await page.waitForTimeout(1000);
});
