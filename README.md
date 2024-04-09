<div align="center"><b>NOTE: THIS REPOSITORY IS A WIP AND AS SUCH THE APIS ARE</b></div>
<div align="center"><b>MORE THEN LIKELY GOING TO CHANGE DRASTICALLY</b></div>

<h2 align="center">
  <div>
    <a href="https://github.com/ribbon-studios/flarie">
      <img height="240px" src="https://raw.githubusercontent.com/ribbon-studios/logos/main/flarie/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="100px" src="https://raw.githubusercontent.com/ribbon-studios/logos/main/flarie/flarie.svg?sanitize=true">
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
		<a href="https://ribbon-studios.gitbook.io/flarie/">Docs</a>
		<!-- • -->
		<!-- <a href="https://salte-auth-demo.glitch.me">Demo</a> -->
	</strong>
</p>

<div align="center">

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![CI Build][github-actions-image]][github-actions-url]

[![Code Style: Prettier][code-style-image]][code-style-url]
[![Maintainability][maintainability-image]][maintainability-url]
[![zx-bulk-release][zx-bulk-release-image]][zx-bulk-release-url]

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

[npm-version-image]: https://img.shields.io/npm/v/@flarie/core.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/@flarie/core.svg
[npm-url]: https://npmjs.org/package/@flarie/core
[github-actions-image]: https://img.shields.io/github/actions/workflow/status/ribbon-studios/flarie/ci.yml?event=push&style=flat
[github-actions-url]: https://github.com/ribbon-studios/flarie/actions/workflows/ci.yml
[coveralls-image]: https://img.shields.io/coveralls/ribbon-studios/flarie.svg
[coveralls-url]: https://coveralls.io/github/ribbon-studios/flarie?branch=main
[code-style-image]: https://img.shields.io/badge/code%20style-prettier-ff69b4.svg
[code-style-url]: https://prettier.io
[maintainability-image]: https://img.shields.io/codeclimate/maintainability/ribbon-studios/flarie
[maintainability-url]: https://codeclimate.com/github/ribbon-studios/flarie/maintainability
[zx-bulk-release-url]: https://github.com/semrel-extra/zx-bulk-release
[zx-bulk-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-zx--bulk--release-e10079
