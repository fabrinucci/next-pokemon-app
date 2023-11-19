import { separateString } from '@/utils/separateString';

describe('separateStrings', () => {
  it('should return the text separated with spaces', () => {
    const text = 'iron-leaves';
    const newText = separateString(text);
    expect(newText).toBe('iron leaves');
  });

  it('should return the same text', () => {
    const text = 'pikachu';
    const newText = separateString(text);
    expect(newText).toBe('pikachu');
  });
});
