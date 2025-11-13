import { describe, expect, it } from 'vitest';

import { hasDuplicateComment, parseBooleanInput } from '../src/lib/util';
import type { LinearComment } from '../src/lib/client';

const sampleComments: LinearComment[] = [
  { id: '1', body: 'Build succeeded ✅' },
  { id: '2', body: 'Build failed ❌' },
];

describe('parseBooleanInput', () => {
  it('returns default value when input missing', () => {
    expect(parseBooleanInput(undefined, true)).toBe(true);
  });

  it('parses typical truthy values', () => {
    expect(parseBooleanInput('true', false)).toBe(true);
    expect(parseBooleanInput('YES', false)).toBe(true);
  });

  it('parses typical falsy values', () => {
    expect(parseBooleanInput('false', true)).toBe(false);
    expect(parseBooleanInput('0', true)).toBe(false);
  });
});

describe('hasDuplicateComment', () => {
  it('detects when a duplicate comment exists', () => {
    expect(hasDuplicateComment(sampleComments, 'Build succeeded ✅')).toBe(true);
  });

  it('returns false when no duplicate exists', () => {
    expect(hasDuplicateComment(sampleComments, 'New comment')).toBe(false);
  });
});
