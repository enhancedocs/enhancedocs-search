# EnhanceDocs Search

[![npm version](https://img.shields.io/npm/v/enhancedocs-search.svg)](https://www.npmjs.com/package/enhancedocs-search)
[![Downloads](https://img.shields.io/npm/dm/enhancedocs-search.svg)](https://www.npmjs.com/package/enhancedocs-search)
[![License: MIT](https://img.shields.io/badge/license-Apache--2.0-yellow)](https://www.apache.org/licenses/LICENSE-2.0)
 [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/enhancedocs.svg?style=social&label=Follow%20%40EnhanceDocs)](https://twitter.com/langchainai)
[![](https://dcbadge.vercel.app/api/server/RJCppmZGrk?compact=true&style=flat)](https://discord.gg/RJCppmZGrk)

## 📦 Installing

### Package manager

Using npm:

```bash
npm install enhancedocs-search
```

Using yarn:

```bash
yarn add enhancedocs-search
```

## 🚀 Usage

First you will need to create a public key (`pk_`) in our [Discord channel](https://discord.gg/RJCppmZGrk).
Then you can install the package and start using it 🎉🎉

```js
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

<EnhancedSearch accessToken="pk_abc123" {...props} />
```

### Docusaurus Example

Configure [Docusaurus](https://docusaurus.io/) theme to use your own search.
See official documentation [here](https://docusaurus.io/docs/search#using-your-own-search).

```js
// src/theme/SearchBar.js

import React from 'react';
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

export default function SearchBarWrapper(props) {
  return <EnhancedSearch accessToken="pk_abc123" {...props} />;
}
```
