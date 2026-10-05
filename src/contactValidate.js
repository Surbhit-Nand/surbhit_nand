export function validateContact(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address.';
  if (values.message.trim().length < 10)
    errors.message = 'Write at least a sentence (10+ characters).';
  return errors;
}
