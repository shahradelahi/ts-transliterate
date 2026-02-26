<h1 align="center">
  <sup>@se-oss/transliterate</sup>
  <br>
  <a href="https://github.com/shahradelahi/ts-transliterate/actions/workflows/ci.yml"><img src="https://github.com/shahradelahi/ts-transliterate/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@se-oss/transliterate"><img src="https://img.shields.io/npm/v/@se-oss/transliterate.svg" alt="NPM Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License"></a>
  <a href="https://bundlephobia.com/package/@se-oss/transliterate"><img src="https://img.shields.io/bundlephobia/minzip/@se-oss/transliterate" alt="npm bundle size"></a>
  <a href="https://packagephobia.com/result?p=@se-oss/transliterate"><img src="https://packagephobia.com/badge?p=@se-oss/transliterate" alt="Install Size"></a>
</h1>

_@se-oss/transliterate_ is a high-performance, strictly typed transliteration library that handles Unicode normalization, smart casing, and multiple scripts with ease.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/transliterate
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/transliterate
```

**yarn**

```bash
yarn add @se-oss/transliterate
```

</details>

## 📖 Usage

### Basic

```typescript
import transliterate from '@se-oss/transliterate';

transliterate('Я люблю единорогов');
//=> 'Ya lyublyu edinorogov'
```

### Advanced Features

- **Smart Casing**: Handles multi-character replacements (e.g., `ЦАРЬ` → `TSAR`).
- **Locale Overrides**: Supports language-specific rules (e.g., German `ä` → `ae`).
- **Functional Replacers**: Use functions for dynamic custom replacements.
- **Strict ASCII**: Option to strip any remaining non-ASCII characters.

```typescript
transliterate('Fußgängerübergänge', { locale: 'de' });
//=> 'Fussgaengeruebergaenge'

transliterate('hello', {
  customReplacements: [['hello', (match) => match.toUpperCase()]],
});
//=> 'HELLO'
```

## 📚 Documentation

For more information, please see the [API docs](https://www.jsdocs.io/package/@se-oss/transliterate).

## 🚀 Performance

| Library                     | hz             | min    | max    | mean   | p99    | rme    |
| :-------------------------- | :------------- | :----- | :----- | :----- | :----- | :----- |
| **@se-oss/transliterate**   | **415,645.80** | 0.0022 | 0.1262 | 0.0024 | 0.0037 | ±0.18% |
| transliteration             | 443,355.83     | 0.0020 | 0.2110 | 0.0023 | 0.0033 | ±0.22% |
| @sindresorhus/transliterate | 2,110.54       | 0.4552 | 0.6961 | 0.4738 | 0.5709 | ±0.30% |

> **Result:** @se-oss/transliterate is **196.93x faster** than @sindresorhus/transliterate.

_Benchmark script: [`bench/index.bench.ts`](bench/index.bench.ts)_

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-transliterate).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-transliterate/graphs/contributors).
