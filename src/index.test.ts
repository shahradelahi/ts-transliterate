import { describe, expect, it } from 'vitest';

import transliterate from './index';

describe('transliterate', () => {
  it('should transliterate cyrillic', () => {
    expect(transliterate('Я люблю единорогов')).toBe('Ya lyublyu edinorogov');
  });

  it('should handle german locale', () => {
    expect(transliterate('Fußgängerübergänge', { locale: 'de' })).toBe('Fussgaengeruebergaenge');
  });

  it('should remove diacritics', () => {
    expect(transliterate('éàîöu')).toBe('eaiou');
  });

  it('should handle custom replacements', () => {
    expect(transliterate('hello', { customReplacements: [['hello', 'hi']] })).toBe('hi');
  });

  it('should support smart casing', () => {
    expect(transliterate('ЦАРЬ')).toBe('TSAR');
    expect(transliterate('Царь')).toBe('Tsar');
    expect(transliterate('ОТЕЦ')).toBe('OTETS');
  });

  it('should transliterate arabic', () => {
    expect(transliterate('أهلا بك')).toBe('ahla bk');
  });

  it('should transliterate persian', () => {
    expect(transliterate('سلام پچژگ')).toBe('slam pchzhg');
    expect(transliterate('قورباغه', { locale: 'fa' })).toBe('ghorbagheh');
  });

  it('should normalize typography', () => {
    expect(transliterate('“smart” ‘quotes’ — dashes')).toBe('"smart" \'quotes\' - dashes');
  });

  it('should support strict ascii mode', () => {
    expect(transliterate('unicorn 🦄', { strictAscii: true })).toBe('unicorn ');
  });

  it('should handle functional custom replacements', () => {
    expect(
      transliterate('hello', {
        customReplacements: [['hello', (m) => m.toUpperCase()]],
      })
    ).toBe('HELLO');
  });

  it('should handle overlapping custom replacements correctly', () => {
    expect(
      transliterate('aa', {
        customReplacements: [
          ['a', 'x'],
          ['aa', 'y'],
        ],
      })
    ).toBe('y');
  });

  it('should transliterate vietnamese', () => {
    expect(transliterate('Tiếng Việt')).toBe('Tieng Viet');
  });

  it('should transliterate armenian', () => {
    expect(transliterate('Բարև')).toBe('Barev');
  });

  it('should transliterate georgian', () => {
    expect(transliterate('გამარჯობა')).toBe('gamarjoba');
  });

  it('should handle mathematical alphanumeric symbols', () => {
    expect(transliterate('𝐇𝐞𝐥𝐥𝐨 𝒲𝑜𝓇𝓁𝒹')).toBe('Hello World');
    expect(transliterate('𝕿𝖍𝖊 𝖖𝖚𝖎𝖈𝖐 𝖇𝖗𝖔𝖜𝖓 𝖋𝖔𝖝')).toBe('The quick brown fox');
  });

  it('should handle enclosed alphanumerics', () => {
    expect(transliterate('① ② ③ Ⓐ Ⓑ Ⓒ')).toBe('1 2 3 (A) (B) (C)');
  });

  it('should transliterate currencies and symbols', () => {
    expect(transliterate('€100 ₿1 №5 #1 @home')).toBe('E100 B1 number5 number1 athome');
  });

  it('should handle emoji-to-text', () => {
    expect(transliterate('💯 🆘 🔞')).toBe('100 SOS 18');
  });

  it('should handle multi-character cyrillic sequences', () => {
    expect(transliterate('подъезд')).toBe('podyezd'); // ъе -> ye
    expect(transliterate('красный')).toBe('krasniy'); // ый -> iy
  });

  it('should handle macedonian specific characters', () => {
    expect(transliterate('Скопје')).toBe('Skopje');
    expect(transliterate('браќа')).toBe('brakja');
  });

  it('should handle dhivehi', () => {
    expect(transliterate('ދިވެހި')).toBe('dhivehi');
  });
});
