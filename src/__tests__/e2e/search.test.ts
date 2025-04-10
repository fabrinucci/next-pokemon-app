import { test, expect } from '@playwright/test';

test.describe.parallel('Search tests', () => {
  test('Show pokemoms when the query matches one of them', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Search pokemon' }).click();
    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('charm');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');

    await expect(page.getByTestId('search-query')).toContainText(
      'These Pokemons found your match: "charm"'
    );

    await expect(page.getByTestId('pokemon-list')).toContainText(
      '#5 charmeleon'
    );

    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('IvySAUR');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('section')).toContainText(
      'These Pokemons found your match: "IvySAUR"'
    );
    await expect(page.getByTestId('pokemon-list')).toContainText('#2 ivysaur');

    await page.goto('/search?query=pika');
    await expect(page.getByTestId('search-query')).toContainText(
      'These Pokemons found your match: "pika"'
    );
    await expect(page.getByTestId('pokemon-list')).toContainText('#25 pikachu');
  });

  test('Do not allow searching when the query is less than 3 characters long', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');
    await expect(page).toHaveURL('/');

    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('a');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');
    await expect(page).toHaveURL('/');

    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('ar');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');
    await expect(page).toHaveURL('/');

    await page.getByRole('textbox', { name: 'Search pokemon' }).fill('ara');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');
    await expect(page).toHaveURL('/search?query=ara');

    await expect(page.getByTestId('search-query')).toContainText(
      'These Pokemons found your match: "ara"'
    );
  });

  test('Show error message when query does not match any pokemon', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('textbox', { name: 'Search pokemon' })
      .fill('ANYTHING');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByTestId('search-query')).toContainText(
      'No Pokemon found your match: "ANYTHING"'
    );

    await page
      .getByRole('textbox', { name: 'Search pokemon' })
      .fill('pokemon3');
    await page.getByRole('textbox', { name: 'Search pokemon' }).press('Enter');
    await expect(page.getByTestId('search-query')).toContainText(
      'No Pokemon found your match: "pokemon3"'
    );

    await page.goto('/search?query=somepokemon');
    await expect(page.getByTestId('search-query')).toContainText(
      'No Pokemon found your match: "somepokemon"'
    );
  });

  test('Go to home when there is no correct search url', async ({ page }) => {
    await page.goto('/');

    const queries = [
      '?query=ar',
      '?query=a',
      '?query=',
      '?query',
      '?quer',
      '?',
      '',
    ];

    for (const query of queries) {
      await page.goto(`/search${query}`);
      await expect(page).toHaveURL('/');
    }
  });
});
