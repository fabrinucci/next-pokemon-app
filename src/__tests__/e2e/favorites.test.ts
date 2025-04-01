import { test, expect } from '@playwright/test';

test.describe.parallel('Favorites tests', () => {
  test('Action "Save" or "Remove" to favorites', async ({ page }) => {
    await page.goto('/');
    const favoritesLink = page.getByRole('link', { name: 'Favorites' });

    await favoritesLink.click();

    await expect(
      page.getByRole('heading', { name: 'No favorites' })
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'No favorites' })).toBeVisible();

    const pokemons = ['charmander', '520', '900'];

    for (const pokemon of pokemons) {
      await page.goto(`/pokemon/${pokemon}`);
      await page.getByRole('button', { name: 'Save to favorites' }).click();
    }

    await expect(
      page.getByRole('button', { name: 'Save to favorites' })
    ).toBeHidden();
    await expect(
      page.getByRole('button', { name: 'Remove from favorites' })
    ).toBeVisible();

    await favoritesLink.click();
    const list = page.getByTestId('favorite-card');
    await expect(list).toHaveCount(3);

    await page.goto('/pokemon/520');
    await page.getByRole('button', { name: 'Remove from favorites' }).click();
    await page.goto('/pokemon/900');
    await page.getByRole('button', { name: 'Remove from favorites' }).click();

    await favoritesLink.click();
    await expect(list).toHaveCount(1);
  });

  test('Favorites persist after reload', async ({ page }) => {
    await page.goto('/pokemon/pikachu');
    await page.getByRole('button', { name: 'Save to favorites' }).click();

    await page.reload();
    await expect(
      page.getByRole('button', { name: 'Remove from favorites' })
    ).toBeVisible();
  });
});
