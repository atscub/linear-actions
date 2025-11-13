import type { LinearComment } from './client';

export function parseBooleanInput(
  value: string | undefined,
  defaultValue = true,
): boolean {
  if (value === undefined || value.trim() === '') {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();

  if (['true', '1', 'yes', 'y'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'no', 'n'].includes(normalized)) {
    return false;
  }

  return defaultValue;
}

export function hasDuplicateComment(
  comments: LinearComment[],
  targetBody: string,
): boolean {
  return comments.some((comment) => comment.body.trim() === targetBody.trim());
}
