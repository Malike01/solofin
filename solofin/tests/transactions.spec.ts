import { test, expect } from '@playwright/test';
import { generateRandomUser } from './utils';

test.describe('Transaction Management', () => {
  
  test.beforeEach(async ({ page }) => {
    const user = generateRandomUser();
    await page.goto('/register');
    await page.getByLabel(/Ad Soyad/i).fill(user.name);
    await page.getByLabel(/E-posta Adresi/i).fill(user.email);
    await page.getByLabel(/^Şifre$/i).fill(user.password);
    await page.getByLabel(/Şifreyi Onayla/i).fill(user.password);
    await page.getByRole('button', { name: 'Kayıt Ol' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should add a new income transaction', async ({ page }) => {
    await page.getByRole('button', { name: 'İşlem Ekle' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByLabel('İşlem Tipi').click();
    await page.getByRole('option', { name: 'Gelir' }).click();

    await page.getByLabel('Tutar').fill('5000');
    await page.getByLabel('Kategori').fill('Freelance İş');
    await page.getByLabel('Açıklama').fill('Web sitesi tasarımı');

    const responsePromise = page.waitForResponse(resp => resp.url().includes('/transactions') && resp.status() === 200);
    await page.getByRole('button', { name: 'Kaydet' }).click();
    await responsePromise; 

    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    await expect(page.getByRole('cell', { name: 'Freelance İş' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '+₺5.000,00' })).toBeVisible();
    
    await expect(page.getByText('Toplam Gelir').locator('..').getByText('₺5.000,00')).toBeVisible();
  });
});