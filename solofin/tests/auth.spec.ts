import { test, expect } from '@playwright/test';
import { generateRandomUser } from "./utils";


test.describe('Authentication Flow', () => {
  
  test('should allow a user to register and redirect to dashboard', async ({ page }) => {
    const user = generateRandomUser();

    await page.goto('/register');

    await page.getByLabel(/Ad Soyad/i).fill(user.name);
    await page.getByLabel(/E-posta Adresi/i).fill(user.email);
    await page.getByLabel(/^Şifre$/i).fill(user.password); // Tam eşleşme
    await page.getByLabel(/Şifreyi Onayla/i).fill(user.password);

    await page.getByRole('button', { name: 'Kayıt Ol' }).click();

    await expect(page).toHaveURL(/.*dashboard/);

    await expect(page.getByText(`Merhaba, ${user.name.split(' ')[0]}`)).toBeVisible();
  });

  test('should allow a user to login', async ({ page }) => {

    const user = generateRandomUser();

    await page.goto('/register');
    await page.getByLabel(/Ad Soyad/i).fill(user.name);
    await page.getByLabel(/E-posta Adresi/i).fill(user.email);
    await page.getByLabel(/^Şifre$/i).fill(user.password);
    await page.getByLabel(/Şifreyi Onayla/i).fill(user.password);
    await page.getByRole('button', { name: 'Kayıt Ol' }).click();
    
    await page.getByRole('button', { name: 'Oturumu Kapat' }).click();

    
    await page.goto('/login');
    await page.getByLabel(/E-posta Adresi/i).fill(user.email);
    await page.getByLabel(/Şifre/i).fill(user.password);
    await page.getByRole('button', { name: 'Giriş Yap' }).click();

    await expect(page).toHaveURL(/.*dashboard/);
  });
});