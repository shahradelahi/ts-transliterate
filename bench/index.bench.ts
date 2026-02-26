import myTransliterate from '@se-oss/transliterate';
import sindreTransliterate from '@sindresorhus/transliterate';
import { transliterate } from 'transliteration';
import { bench, describe } from 'vitest';

const fixture = 'Я люблю единорогов. أهلا بك. Fußgängerübergänge!';

describe('Transliterate Benchmark', () => {
  bench('@se-oss/transliterate', () => {
    myTransliterate(fixture);
  });

  bench('@sindresorhus/transliterate', () => {
    sindreTransliterate(fixture);
  });

  bench('transliteration', () => {
    transliterate(fixture);
  });
});
