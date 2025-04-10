import { test, expect } from '@playwright/test';

test.describe.parallel('Navigation tests', () => {
  test('Navigation components', async ({ page }) => {
    await page.goto('/');

    const homeLink = page.getByTestId('home-link');
    const favoritesLink = page.getByRole('link', { name: 'Favorites' });

    const bulbasaur = page.getByRole('link', {
      name: '#1 bulbasaur',
    });
    await bulbasaur.click();

    await expect(page).toHaveURL('/pokemon/bulbasaur');

    await page.getByRole('button', { name: 'Save to favorites' }).click();
    await favoritesLink.click();
    await expect(page).toHaveURL('/favorites');
    await page.getByTestId('favorite-card').click();

    await expect(
      page.getByRole('heading', {
        name: 'bulbasaur',
        exact: true,
      })
    ).toBeVisible();

    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('Navigation HomePage', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('home-link')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Favorites' })).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: 'Search pokemon' })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Pokemon List' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '#1 bulbasaur bulbasaur' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '#10 caterpie caterpie' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: '#21 spearow spearow' })
    ).toBeHidden();
  });

  test('Navigation pokemon card', async ({ page }) => {
    await page.goto('/pokemon/charmander');

    await expect(
      page.getByRole('img', { name: 'charmander', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'charmander' })
    ).toBeVisible();

    await expect(page.getByTestId('button-favorite')).toContainText(
      'Save to favorites'
    );
    await page.getByTestId('button-favorite').click();
    await expect(page.getByTestId('button-favorite')).toContainText(
      'Remove from favorites'
    );

    await expect(
      page.getByRole('heading', { name: 'Description:' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Types' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Abilities' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Height' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Weight' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sprites:' })).toBeVisible();
    await page.getByRole('img', { name: 'charmander sprite' }).nth(1).click();
  });

  test('Navigation pokemon favorites page', async ({ page }) => {
    await page.goto('/favorites');
    await expect(
      page.getByRole('heading', { name: 'No favorites' })
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'No favorites' })).toBeVisible();

    await page.goto('/pokemon/5');
    await page.getByTestId('button-favorite').click();
    await page.getByRole('link', { name: 'Favorites' }).click();
    await expect(
      page.getByRole('heading', { name: 'Your favorite pokemons' })
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Pokemon Favorite' })
    ).toBeVisible();
  });

  test('Show not found page when the url does not exist', async ({ page }) => {
    await page.goto('/anything');
    await expect(page.getByRole('heading', { name: 'Ups!' })).toBeVisible();
    await expect(page.getByText('We can not find the page you')).toBeVisible();
    await expect(
      page.getByRole('img', { name: 'Not found image' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
    await page.getByRole('link', { name: 'Return home' }).click();
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', { name: 'Pokemon List' })
    ).toBeVisible();

    await page.goto('search/anything');
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();

    await page.goto('favorites/anything');
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
  });

  test('Go to home page when there are no pokemons', async ({ page }) => {
    await page.goto('/');

    let pokemons = ['anything', 'ivy', '25055', false];

    for (const pokemon of pokemons) {
      await page.goto(`pokemon/${pokemon}`);
      await expect(page).toHaveURL('/');
    }
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
  });

  test('Search pagination works correctly', async ({ page }) => {
    await page.goto('/search?query=ara');

    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.locator('section')).toContainText('Next');

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.locator('section')).toContainText('Previous');
    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
  });
});
