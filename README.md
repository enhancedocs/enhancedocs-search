<h1 align="center" style="margin-top: 32px">
  <a href="https://enhancedocs.com">
    <img src="./public/logo-enhance-docs-small.png?raw=true" alt="EnhanceDocs">
  </a>
</h1>

<div align="center">

  [![npm version](https://img.shields.io/npm/v/enhancedocs-search.svg)](https://www.npmjs.com/package/enhancedocs-search)
  [![Downloads](https://img.shields.io/npm/dm/enhancedocs-search.svg)](https://www.npmjs.com/package/enhancedocs-search)
  [![License: MIT](https://img.shields.io/badge/license-Apache--2.0-yellow)](https://www.apache.org/licenses/LICENSE-2.0)
  [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/enhancedocs.svg?style=social&label=Follow%20%40EnhanceDocs)](https://twitter.com/langchainai)
  [![](https://dcbadge.vercel.app/api/server/AUDa3KZavw?compact=true&style=flat)](https://discord.com/invite/AUDa3KZavw)

</div>

# EnhanceDocs Search

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

### Getting Started

First you will need to create a project and a public key (`pk_`) in our [Discord Channel](https://discord.com/invite/AUDa3KZavw).
Then you can install the package and start using it 🎉🎉

Use your public key to enable the **enhanced search** powered by AI:

```js
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

<EnhancedSearch
  config={{
    enhancedSearch: {
      projectId: "abc123",
      accessToken: "pk_abc123"
    }
  }}
  {...props}
/>
```

Optionally, you can get **instant results** by configuring the documents search. See our [Discord Channel](https://discord.com/invite/AUDa3KZavw)

```js
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

<EnhancedSearch
  config={{
    enhancedSearch: {
      projectId: "abc123",
      accessToken: "pk_abc123"
    },
    docSearch: {
      apiKey: 'abc123',
      host: 'abc123-0.aa.docsearch.xxx',
      collection: 'abc123'
    }
  }}
  {...props}
/>
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
  return (
    <EnhancedSearch
      config={{
        enhancedSearch: {
          projectId: "abc123",
          accessToken: "pk_abc123"
        }
      }}
      {...props}
    />
  );
}
```

### Custom Theming

Set up your preferred primary color configuring the theme:

```js
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

<EnhancedSearch
  config={{
    enhancedSearch: {
      projectId: "abc123",
      accessToken: "pk_abc123"
    }
  }}
  theme={{
    primaryColor: 'red'
  }}
  {...props}
/>
```

### Use it on any Vanilla project

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vanilla project</title>
  </head>
  <body>
    <div id="enhancedocs-search"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

#### Option 1: Install the NPM package and use the render helper:

Reference to any HTML element by ID (e.g.: `<div id="enhancedocs-search"></div>`):

```js
import { renderSearch } from './enhancedocs-search';

renderSearch('enhancedocs-search', {
  config: {
    enhancedSearch: {
      projectId: 'abc123',
      accessToken: 'pk_abc123'
    }
  }
});
```

#### Option 2: Load the package as script and use the render helper:

```js
function loadScript(src, onLoadCallback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onLoadCallback;
  document.head.appendChild(script);
}

function onLoadCallback() {
  EnhancedocsSearch.renderSearch('enhancedocs-search', {
    config: {
      enhancedSearch: {
        projectId: 'abc123',
        accessToken: 'pk_abc123'
      }
    }
  });
}

loadScript('https://unpkg.com/enhancedocs-search@latest/dist/enhancedocs-search.umd.cjs', onLoadCallback);
```
