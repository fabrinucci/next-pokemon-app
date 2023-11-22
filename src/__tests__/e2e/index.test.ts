import { test, expect } from '@playwright/test';

test('Test navigation components', async ({ page }) => {
  await page.goto('/');

  const homeLink = page.getByTestId('home-link');
  const favoritesLink = page.getByRole('link', { name: 'Favorites' });

  const bulbasaur = page.getByRole('button', {
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

test('Test navigation url', async ({ page }) => {
  await page.goto('/');

  await page.goto('/pokemon/2');
  await expect(
    page.getByRole('heading', {
      name: 'ivysaur',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/pokemon/200');
  await expect(
    page.getByRole('heading', {
      name: 'misdreavus',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/name/charmander');
  await expect(
    page.getByRole('heading', {
      name: 'charmander',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/name/sylveon');
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

  await page.goto('/name/500');
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
  ).not.toBeVisible();

  await page.goto('/pokemon/981821');
  await expect(
    page.getByRole('heading', {
      name: 'Pokemon List',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/name/anything');
  await expect(
    page.getByRole('heading', {
      name: 'Pokemon List',
      exact: true,
    })
  ).toBeVisible();

  await page.goto('/anything');
  await expect(
    page.getByRole('heading', {
      name: '404',
      exact: true,
    })
  ).toBeVisible();
});

test('Test action "Save" or "Remove" to favorites', async ({ page }) => {
  await page.goto('/');
  const favoritesLink = page.getByRole('link', { name: 'Favorites' });

  await favoritesLink.click();

  await expect(
    page.getByRole('heading', { name: 'No favorites' })
  ).toBeVisible();
  await expect(page.getByRole('img', { name: 'No favorites' })).toBeVisible();

  // save to favorites
  await page.goto('/name/bulbasaur');
  await page.getByRole('button', { name: 'Save to favorites' }).click();
  await page.goto('/name/charmander');
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
