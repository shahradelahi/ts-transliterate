import { locales } from './locales';
import { defaultMap } from './maps';
import { Options } from './typings';
import { applyReplacements, createRegex, removeDiacritics, replaceWithMap } from './utils';

const defaultRegex = createRegex(defaultMap.keys());
const localeCache = new Map<string, RegExp>();

/**
 * Transliterate a string to Latin characters.
 *
 * @param string - The string to transliterate.
 * @param options - Transliteration options.
 * @returns The transliterated string.
 *
 * @example
 * ```ts
 * transliterate('Я люблю единорогов');
 * // => 'Ya lyublyu edinorogov'
 * ```
 */
export default function transliterate(string: string, options: Options = {}): string {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof string}`);
  }

  const { smartCase = true, strictAscii = false, locale } = options;
  let result = string;

  // 1. Custom Replacements (Regex-based, small maps)
  if (options.customReplacements) {
    result = applyReplacements(result, options.customReplacements, smartCase);
  }

  // 2. Locale Replacements (Cached regex)
  if (locale && locales.has(locale)) {
    const localeMap = locales.get(locale)!;
    let regex = localeCache.get(locale);
    if (!regex) {
      regex = createRegex(localeMap.keys());
      localeCache.set(locale, regex);
    }

    result = replaceWithMap(result, regex, localeMap, smartCase);
  }

  // 3. General Transliteration (Globally cached regex)
  result = replaceWithMap(result, defaultRegex, defaultMap, smartCase);

  // 4. Normalize and remove combining diacritical marks
  result = removeDiacritics(result);

  // 5. Optional Strict ASCII mode
  if (strictAscii) {
    // eslint-disable-next-line no-control-regex
    result = result.replace(/[^\x00-\x7F]/g, '');
  }

  return result;
}
