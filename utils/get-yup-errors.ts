import { ValidationError } from "yup";

export function getYupErrors<T extends string>(
  error: ValidationError,
): Partial<Record<T, string>> {
  const errors: Partial<Record<T, string>> = {};

  const validationErrors = error.inner.length > 0 ? error.inner : [error];

  validationErrors.forEach((validationError) => {
    const field = validationError.path as T | undefined;

    if (field && !errors[field]) {
      errors[field] = validationError.message;
    }
  });

  return errors;
}
