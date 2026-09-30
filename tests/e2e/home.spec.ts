import { expect, test } from "@playwright/test";

test("home links to both product document sets", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "M33R Studio" })).toBeVisible();
  await page.locator("header").getByRole("link", { name: "Products" }).click();
  await expect(page.locator("main").getByRole("heading", { name: "Products", exact: true })).toBeVisible();

  for (const product of ["M33RA", "CodeTap"]) {
    await page.locator("main").getByRole("link", { name: product, exact: true }).click();
    await expect(page.getByRole("heading", { name: product, exact: true })).toBeVisible();
    for (const document of ["Application Policy", "Privacy Policy"]) {
      await page.getByRole("link", { name: new RegExp(document) }).click();
      await expect(page.getByRole("heading", { name: document })).toBeVisible();
      await page.locator("main").getByRole("link", { name: product, exact: true }).click();
    }
    await page.locator("main").getByRole("link", { name: "Products", exact: true }).click();
  }
});

for (const width of [1280, 390]) {
  test(`home navigation and FAQ work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.getByAltText("Make Beauty. Remove Friction.")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    await page.getByRole("link", { name: "CodeTap の紹介を見る", exact: true }).click();
    await expect(page.getByRole("heading", { name: "CodeTap", exact: true })).toBeInViewport();
    await page.locator("header").getByRole("link", { name: "About", exact: true }).click();
    await expect(page.locator("#about")).toBeInViewport();

    const faq = page.locator("details").nth(1);
    await expect(faq).not.toHaveAttribute("open");
    await faq.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(faq).toHaveAttribute("open", "");
    await expect(faq.locator("p")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(faq).not.toHaveAttribute("open");

    await page.locator("header").getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page.locator("footer")).toBeInViewport();
  });
}
