import { escape } from '@se-oss/regexp-escape';

import { Replacer } from './typings';

/**
 * Normalize and remove combining diacritical marks.
 *
 * @example
 * ```ts
 * removeDiacritics('éàîöu'); // 'eaiou'
 * ```
 */
export function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Resolve the casing of a replacement based on the original character and context.
 */
export function resolveCase(
  originalChar: string,
  replacement: string,
  nextChar?: string,
  prevChar?: string
): string {
  if (
    replacement.length === 1 ||
    originalChar === originalChar.toLowerCase() ||
    (originalChar === originalChar.toUpperCase() && originalChar === originalChar.toLowerCase())
  ) {
    return replacement;
  }

  const isNextUpper =
    nextChar && nextChar === nextChar.toUpperCase() && nextChar.toLowerCase() !== nextChar;
  const isPrevUpper =
    prevChar && prevChar === prevChar.toUpperCase() && prevChar.toLowerCase() !== prevChar;

  if (isNextUpper || isPrevUpper) {
    return replacement.toUpperCase();
  }

  return replacement;
}

/**
 * Create a regular expression from a list of keys, sorted by length descending.
 */
export function createRegex(keys: Iterable<string>): RegExp {
  const sortedKeys = Array.from(keys).sort((a, b) => b.length - a.length);
  if (sortedKeys.length === 0) {
    return /$^/; // Matches nothing
  }
  const escapedKeys = sortedKeys.map(escape).join('|');
  return new RegExp(`(?:${escapedKeys})`, 'g');
}

/**
 * Apply replacements using a regular expression and a lookup map.
 */
export function replaceWithMap(
  str: string,
  regex: RegExp,
  map: Map<string, Replacer>,
  smartCase = false
): string {
  return str.replace(regex, (match, offset) => {
    const replacer = map.get(match);
    let replacement = typeof replacer === 'function' ? replacer(match) : (replacer ?? match);

    if (smartCase && replacement.length > 1) {
      replacement = resolveCase(
        match[0]!,
        replacement,
        str[offset + match.length],
        str[offset - 1]
      );
    }

    return replacement;
  });
}

/**
 * Apply replacements using a regular expression.
 *
 * @example
 * ```ts
 * applyReplacements('hello', [['hello', 'hi']]); // 'hi'
 * ```
 */
export function applyReplacements(
  str: string,
  replacements: ReadonlyArray<[string, Replacer]> | Map<string, Replacer>,
  smartCase = false
): string {
  const map =
    replacements instanceof Map ? (replacements as Map<string, Replacer>) : new Map(replacements);

  if (map.size === 0) {
    return str;
  }

  const regex = createRegex(map.keys());
  return replaceWithMap(str, regex, map, smartCase);
}
