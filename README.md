# Code Your Own Cryptocurrency on Ethereum

Playlist: https://www.youtube.com/watch?v=XdKv5uwEk5A&list=PLS5SEs8ZftgWFuKg2wbm_0GLV0Tiy1R-n

1. We are going to create a currency called 'DAPP Token'.
1. We will create a website where we can purchase the tokens.
1. We will create a token sale smart contract (ICO).

We will be using the Rinkeby Test Network to create the token
in a test environment with fake Ether.


## Contents

- [Code Your Own Cryptocurrency on Ethereum](#code-your-own-cryptocurrency-on-ethereum)
  - [Contents](#contents)
  - [01. Intro to ERC-20 & Setup](#01-intro-to-erc-20--setup)
    - [Truffle](#truffle)
    - [Genache](#genache)
    - [Metamask](#metamask)
  - [02. First Smart Contract](#02-first-smart-contract)


## 01. Intro to ERC-20 & Setup

ERC - Etherium Request for Comments

EIP - Etherium Improvement Proposal

ERC-20 defines the interface and functionality standards requied for a token.

We will install developer tools, which are part of the Truffle Suite.

### Truffle

The Truffle framework is a tool used for Ethereum development.

It gives us tools to write, test, and deploy our smart contracts using Solidity.

We can also develop client-side applications using Truffle.

Install: `npm install -g truffle`

> Truffle is a developer environment, testing framework and asset pipeline for blockchains. **It allows developers to spin up a smart contract project at the click of a button and provides you with a project structure, files, and directories that make deployment and testing much easier** (or else you would have to configure these yourself).

### Genache

Allows you to create a private blockchain with a local block explorer.

> Ganache allows you to create a private Ethereum blockchain for you to run tests, execute commands, and inspect state while controlling how the chain operates. **It gives you the ability to perform all actions you would on the main chain without the cost**. Many developers use this to test their smart contracts during development. It provides convenient tools such as advanced mining controls and a built-in block explorer.

Install: https://www.trufflesuite.com/ganache

### Metamask

We will use the MetaMask extension for the wallet.


## 02. First Smart Contract

Open Genache.

![](docs/2021-03-11-22-51-00.png)

Navigate in terminal: `cd token_sale/`

Initialise a new Ethereum project using Truffle: `truffle init`

![](docs/2021-03-11-22-54-04.png)

Go into `truffe-config.js`.