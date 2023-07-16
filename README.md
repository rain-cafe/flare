<div align="center"><b>NOTE: THIS REPOSITORY IS A WIP AND AS SUCH THE APIS ARE</b></div>
<div align="center"><b>MORE THEN LIKELY GOING TO CHANGE DRASTICALLY</b></div>

<h2 align="center">
  <div>
    <a href="https://github.com/rain-cafe/logos">
      <img height="240px" src="https://raw.githubusercontent.com/rain-cafe/logos/main/flare/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="100px" src="https://raw.githubusercontent.com/rain-cafe/logos/main/flare/flare.svg?sanitize=true">
    </a>
  </div>
</h2>

<h3 align="center">
  A universal bot framework!~ :heart:
</h3>

<p align="center">
	<strong>
		<!-- <a href="https://flare.github.io">API</a> -->
		<!-- • -->
		<a href="https://rain-cafe.gitbook.io/flare/">Docs</a>
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
# Install the Flare Core
$ npm install @flare/core
# Install any Platforms you need
$ npm install @flare/discord
```

## Usage

```ts
import { Flare, CampfirePlatform } from '@flare/core';
import { DiscordPlatform } from '@flare/discord';

const flare = new Flare({
    platform: new DiscordPlatform({
      token: '<your-discord-bot-token-here>'
    });,
});
```

## Known Issues

_These are issues that we know about, but don't have a clear fix for!_

**There are currently no known issues, thanks for checking!**

[npm-version-image]: https://img.shields.io/npm/v/@flare/flare.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@flare/flare.svg?style=flat
[npm-url]: https://npmjs.org/package/@flare/flare

[github-actions-image]: https://github.com/rain-cafe/flare/actions/workflows/ci.yml/badge.svg?branch=main
[github-actions-url]: https://github.com/rain-cafe/flare/actions/workflows/ci.yml

[coveralls-image]: https://img.shields.io/coveralls/rain-cafe/flare.svg
[coveralls-url]: https://coveralls.io/github/rain-cafe/flare?branch=main

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
