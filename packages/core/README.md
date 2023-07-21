<div align="center"><b>NOTE: THIS REPOSITORY IS A WIP AND AS SUCH THE APIS ARE</b></div>
<div align="center"><b>MORE THEN LIKELY GOING TO CHANGE DRASTICALLY</b></div>

<h2 align="center">
  <div>
    <a href="https://github.com/rain-cafe/flarie">
      <img height="240px" src="https://raw.githubusercontent.com/rain-cafe/logos/main/flarie/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="100px" src="https://raw.githubusercontent.com/rain-cafe/logos/main/flarie/flarie.svg?sanitize=true">
    </a>
  </div>
</h2>

<h3 align="center">
  A universal bot framework!~ :heart:
</h3>

<p align="center">
	<strong>
		<!-- <a href="https://flarie.github.io">API</a> -->
		<!-- • -->
		<a href="https://rain-cafe.gitbook.io/flarie/">Docs</a>
		<!-- • -->
		<!-- <a href="https://salte-auth-demo.glitch.me">Demo</a> -->
	</strong>
</p>

<div align="center">

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Downloads][npm-downloads-image]][npm-url]
  
  [![CI Build][github-actions-image]][github-actions-url]
  [![Coveralls][coveralls-image]][coveralls-url]
  [![semantic-release][semantic-release-image]][semantic-release-url]
  
</div>

#### Supported Platforms

- Campfire _(local testing harness)_
- [Discord](packages/discord)


## Install

```sh
# Install the Flarie Core
$ npm install @flarie/core
# Install any Platforms you need
$ npm install @flarie/discord
```

## Usage

```ts
import { Flarie, CampfirePlatform } from '@flarie/core';
import { DiscordPlatform } from '@flarie/discord';

const flarie = new Flarie({
    platform: new DiscordPlatform({
      token: '<your-discord-bot-token-here>'
    });,
});
```

## Known Issues

_These are issues that we know about, but don't have a clear fix for!_

**There are currently no known issues, thanks for checking!**

[npm-version-image]: https://img.shields.io/npm/v/@flarie/core.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@flarie/core.svg?style=flat
[npm-url]: https://npmjs.org/package/@flarie/core

[github-actions-image]: https://github.com/rain-cafe/flarie/actions/workflows/ci.yml/badge.svg?branch=main
[github-actions-url]: https://github.com/rain-cafe/flarie/actions/workflows/ci.yml

[coveralls-image]: https://img.shields.io/coveralls/rain-cafe/flarie.svg
[coveralls-url]: https://coveralls.io/github/rain-cafe/flarie?branch=main

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
