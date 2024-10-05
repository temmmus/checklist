import { config } from "dotenv";
import { test, expect } from "@playwright/test";

config();
const appUrl = `http://localhost:${process.env.VITE_APP_PORT}`;

test.describe("Checklist app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);
  });

  test("Add new item to the list", async ({ page }) => {
    const text: string = "Test item";

    await page.fill('textarea[placeholder="Add item"]', text);
    const addItemButton = page.locator(".add-item__button");
    await expect(addItemButton).toBeEnabled();
    await addItemButton.click();

    const itemTextArea = page.locator('textarea[placeholder="Item text"]');
    await expect(itemTextArea).toBeVisible();
    await expect(itemTextArea).toHaveValue(text);

    const addItemTextArea = page.locator('textarea[placeholder="Add item"]');
    await expect(addItemTextArea).toBeVisible();
    await expect(addItemTextArea).toBeEmpty();
  });

  test("Remove an item from the list", async ({ page }) => {
    await page.fill('textarea[placeholder="Add item"]', "Test item");
    const addItemButton = page.locator(".add-item__button");
    await addItemButton.click();

    const removeButton = await page
      .locator('textarea[placeholder="Item text"]')
      .locator("..")
      .locator("button");
    await removeButton.click();

    const listItem = page.locator('textarea[placeholder="Item text"]');
    await expect(listItem).not.toBeVisible();
  });

  test("Mark an item as completed", async ({ page }) => {
    await page.fill('textarea[placeholder="Add item"]', "Test item");
    const addItemButton = page.locator(".add-item__button");
    await addItemButton.click();

    const listItemCheckbox = page.locator("input.item__checkbox");
    await expect(listItemCheckbox).not.toBeChecked();

    await listItemCheckbox.check();
    await expect(listItemCheckbox).toBeChecked();

    const listItem = listItemCheckbox.locator("..");
    await expect(listItem).toHaveClass(/item--done/);
  });

  test("Check list filtering", async ({ page }) => {
    const addItemButton = page.locator(".add-item__button");
    const allFilterButton = page.locator("button", { hasText: "All" });
    const activeFilterButton = page.locator("button", { hasText: "Active" });
    const doneFilterButton = page.locator("button", { hasText: "Done" });

    // Add item "Done item" and check it as done
    await page.fill('textarea[placeholder="Add item"]', "Done item");
    await addItemButton.click();

    const doneItemCheckbox = page.locator("input.item__checkbox").first();
    await doneItemCheckbox.check();

    // Add item "Active item"
    await page.fill('textarea[placeholder="Add item"]', "Active item");
    await addItemButton.click();

    // Get item Ids
    const doneItemId = await page
      .locator("li.item")
      .first()
      .evaluate((el) => el.id);

    const activeItemId = await page
      .locator("li.item")
      .nth(1)
      .evaluate((el) => el.id);

    // Check "All" filtering
    await expect(allFilterButton).toHaveClass(/filters__button--active/);
    await expect(page.locator(`#${doneItemId}`)).toBeVisible();
    await expect(page.locator(`#${activeItemId}`)).toBeVisible();

    // Check "Active" filtering
    await activeFilterButton.click();
    await expect(activeFilterButton).toHaveClass(/filters__button--active/);
    await expect(page.locator(`#${doneItemId}`)).not.toBeVisible();
    await expect(page.locator(`#${activeItemId}`)).toBeVisible();

    // Check "Done" filtering
    await doneFilterButton.click();
    await expect(doneFilterButton).toHaveClass(/filters__button--active/);
    await expect(page.locator(`#${doneItemId}`)).toBeVisible();
    await expect(page.locator(`#${activeItemId}`)).not.toBeVisible();
  });
});
