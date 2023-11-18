import { capitalized } from '@/utils/capitalized';

describe('capitalized', () => {
  it('should capitalize the first word', () => {
    const text = 'pikachu';
    const newText = capitalized(text);
    expect(newText).toBe('Pikachu');
  });

  it('should return the same text', () => {
    const text = 'Rattata';
    const newText = capitalized(text);
    expect(newText).toBe('Rattata');
  });
});
