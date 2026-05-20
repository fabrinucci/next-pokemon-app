import '@testing-library/jest-dom';

jest.mock('next/cache', () => ({
  unstable_cache: (fn) => fn,
}));