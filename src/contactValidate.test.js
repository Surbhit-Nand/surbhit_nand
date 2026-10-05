import { describe, expect, it } from 'vitest';
import { validateContact } from './contactValidate.js';

const good = {
  name: 'Ama',
  email: 'ama@example.com',
  message: 'Hello, I liked your buses project.',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(good)).toEqual({});
  });

  it('rejects a short name', () => {
    expect(validateContact({ ...good, name: 'A' })).toHaveProperty('name');
  });

  it('rejects a malformed email', () => {
    for (const email of ['nope', 'a@b', '@x.com', 'a b@c.com']) {
      expect(validateContact({ ...good, email })).toHaveProperty('email');
    }
  });

  it('rejects a short message', () => {
    expect(validateContact({ ...good, message: 'Hi' })).toHaveProperty('message');
  });
});
