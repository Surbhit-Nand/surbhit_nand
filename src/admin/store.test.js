import { describe, expect, it } from 'vitest';
import { checkImageUrl } from './store.js';

describe('checkImageUrl', () => {
  it('accepts Google Photos direct links silently', () => {
    expect(checkImageUrl('https://lh3.googleusercontent.com/pw/abc=w1600')).toBe('');
  });

  it('rejects non-https links', () => {
    expect(checkImageUrl('photos.google.com/share/x')).toContain('https://');
  });

  it('warns on share links but still saves', () => {
    const message = checkImageUrl('https://photos.app.goo.gl/xyz');
    expect(message).toContain('will not display');
  });
});
