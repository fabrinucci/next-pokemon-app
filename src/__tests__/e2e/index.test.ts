import { test, expect } from '@playwright/test';

test('Navigation components', async ({ page }) => {
  await page.goto('/');

  const homeLink = page.getByTestId('home-link');
  const favoritesLink = page.getByRole('link', { name: 'Favorites' });

  const bulbasaur = page.getByRole('link', {
    name: '#1 bulbasaur',
  });
  await bulbasaur.click();

  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await favoritesLink.click();
  await page.getByTestId('favorite-card').click();

  await expect(
    page.getByRole('heading', {
      name: 'bulbasaur',
      exact: true,
    })
  ).toBeVisible();

  await homeLink.click();
});

test('Navigation url', async ({ page }) => {
  await page.goto('/');

  await page.goto('/pokemon/2');
  await expect(
    page.getByRole('heading', {
      name: 'ivysaur',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/pokemon/sylveon');
  await expect(
    page.getByRole('heading', {
      name: 'sylveon',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/pokemon/iron-leaves');
  await expect(
    page.getByRole('heading', {
      name: 'iron leaves',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/pokemon/500');
  await expect(
    page.getByRole('heading', {
      name: 'emboar',
      exact: true,
    })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', {
      name: 'Pokemon List',
      exact: true,
    })
  ).toBeHidden();

  await page.goto('/pokemon/981821');
  await expect(
    page.getByRole('heading', {
      name: 'Pokemon List',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/pokemon/anything');
  await expect(
    page.getByRole('heading', {
      name: 'Pokemon List',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/anything');
  await expect(page.getByRole('heading', { name: 'Ups!' })).toBeVisible();
  await expect(page.getByText('We can not find the page you')).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Not found image' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();

  await page.getByRole('link', { name: 'Return home' }).click();
  await expect(
    page.getByRole('heading', { name: 'Pokemon List' })
  ).toBeVisible();
});

test('Action "Save" or "Remove" to favorites', async ({ page }) => {
  await page.goto('/');
  const favoritesLink = page.getByRole('link', { name: 'Favorites' });

  await favoritesLink.click();

  await expect(
    page.getByRole('heading', { name: 'No favorites' })
  ).toBeVisible();
  await expect(page.getByRole('img', { name: 'No favorites' })).toBeVisible();

  // save to favorites
  await page.goto('/pokemon/bulbasaur');
  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await page.goto('/pokemon/charmander');
  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await page.goto('/pokemon/150');
  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await page.goto('/pokemon/520');
  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await page.goto('/pokemon/900');
  await page.getByRole('button', { name: 'Save to favorites' }).click();

  await expect(
    page.getByRole('button', { name: 'Save to favorites' })
  ).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Remove from favorites' })
  ).toBeVisible();

  await favoritesLink.click();
  const list = page.getByTestId('favorite-card');
  await expect(list).toHaveCount(5);

  // remove from favorites
  await page.goto('/pokemon/150');
  await page.getByRole('button', { name: 'Remove from favorites' }).click();
  await page.goto('/pokemon/520');
  await page.getByRole('button', { name: 'Remove from favorites' }).click();
  await page.goto('/pokemon/900');
  await page.getByRole('button', { name: 'Remove from favorites' }).click();

  await favoritesLink.click();
  await expect(list).toHaveCount(2);
});
