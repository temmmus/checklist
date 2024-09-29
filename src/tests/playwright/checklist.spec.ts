import { config } from "dotenv";
import { test, expect } from "@playwright/test";

config();
const appUrl = `http://localhost:${process.env.VITE_APP_PORT}`;

test.describe("Checklist app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("Add new item to the list", async ({ page }) => {
    await page.fill('input[placeholder="Add item"]', "Test item");

    const addItemButton = page.locator(".add-item__button");
    await expect(addItemButton).toBeEnabled();
    await addItemButton.click();

    const listItem = page.locator('input[value="Test item"]');
    await expect(listItem).toBeVisible();
  });

  test("Remove an item from the list", async ({ page }) => {
    await page.fill('input[placeholder="Add item"]', "Test item");
    const addItemButton = page.locator(".add-item__button");
    await addItemButton.click();

    const removeButton = await page
      .locator('input[value="Test item"]')
      .locator("..")
      .locator("button");
    await removeButton.click();

    const listItem = page.locator('input[value="Test item"]');
    await expect(listItem).not.toBeVisible();
  });

  test("Mark an item as completed", async ({ page }) => {
    await page.fill('input[placeholder="Add item"]', "Test item");
    const addItemButton = page.locator(".add-item__button");
    await addItemButton.click();

    const listItemCheckbox = page.locator("input.item__checkbox");

    await expect(listItemCheckbox).not.toBeChecked();

    await listItemCheckbox.check();

    await expect(listItemCheckbox).toBeChecked();

    const listItem = listItemCheckbox.locator("..");
    await expect(listItem).toHaveClass(/item--done/);
  });
});
