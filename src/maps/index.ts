import { alphanumericMap } from './alphanumeric';
import { arabicMap } from './arabic';
import { armenianMap } from './armenian';
import { cyrillicMap } from './cyrillic';
import { dhivehiMap } from './dhivehi';
import { georgianMap } from './georgian';
import { greekMap } from './greek';
import { latinMap } from './latin';
import { persianMap } from './persian';
import { symbolsMap } from './symbols';
import { typographyMap } from './typography';
import { vietnameseMap } from './vietnamese';

export const defaultMap = new Map([
  ...alphanumericMap,
  ...typographyMap,
  ...symbolsMap,
  ...arabicMap,
  ...persianMap,
  ...cyrillicMap,
  ...greekMap,
  ...latinMap,
  ...vietnameseMap,
  ...armenianMap,
  ...georgianMap,
  ...dhivehiMap,
]);
