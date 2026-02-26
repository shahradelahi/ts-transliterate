/**
 * A string or a function that returns a string for replacement.
 */
export type Replacer = string | ((match: string) => string);

/**
 * Custom mapping for transliteration.
 */
export type CustomReplacements = ReadonlyArray<[string, Replacer]> | Map<string, Replacer>;

export interface Options {
  /**
   * Custom replacements to apply before any other transformations.
   */
  readonly customReplacements?: CustomReplacements;

  /**
   * BCP-47 language tag for language-specific transliteration (e.g., 'de').
   */
  readonly locale?: string;

  /**
   * Maintain strict uppercase matching for multi-character replacements.
   * @default true
   */
  readonly smartCase?: boolean;

  /**
   * Strip all non-ASCII characters left over after transliteration.
   * @default false
   */
  readonly strictAscii?: boolean;
}
