# Hardhat Typescript Bootstrap Svelte Template

## 01. Setup

(for the `hh` shorthand command)
```bash
npm i -g hardhat-shorthand
```

## 02. Create npm/hardhat project
```bash
npm init -y
npm install -D hardhat
hh
> Create an empty hardhat.config.js
```

Create a gitignore.

## 03. Setup testing

`ethereum-waffle` currently has 3000+ high vulnerabilities,
So I am going to ignore unit testing...
and there is no other way I can see to do typescript testing. :(

> See https://hardhat.org/guides/waffle-testing.html
>
> ```bash
> npm install -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle chai
> ```
>
> We will add imports for waffle (and ethers) in the hardhat config.
>
> ```js
> require('@nomiclabs/hardhat-waffle')
> ```


## 04. Setup solidity + deployment

Just set the version to `solidity: "0.7.0"` in the hardhat config.

You can write your contracts and compile + deploy them.
```bash
hh compile
hh run --network localhost scripts/deploy.js
```

Make sure that `require("@nomiclabs/hardhat-waffle");` is included in the hardhat config (even if
`hardhat-waffle` is not installed)


## 04. Setup typescript

See https://hardhat.org/guides/typescript.html

```bash
npm install --save-dev ts-node typescript
npm install --save-dev chai @types/node @types/mocha @types/chai # for testing
```

```bash
mv hardhat.config.js hardhat.config.ts
mv scripts/deploy.js scripts/deploy.ts
```
You will need to change a few lines to typescript such as:
```js
import * as fs from 'fs'; // instead of require('...')
import { ethers } from "hardhat"; // instead of require('...')
import "@nomiclabs/hardhat-waffle"; // instead of require('...')
```
And of-course, change the deployment command in `package.json` or otherwise.

## 05. Metamask accounts

When you run `hardhat node`, it will show the address + private key for each account.
We can import this account into metamask.