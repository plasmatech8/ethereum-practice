# Building the Website

We need to expose our contract APIs to our website.

## Contents

## 11. Setup and Installs

* Download [bootstrap js/css bundles](https://getbootstrap.com/docs/5.0/getting-started/download/)
* Download [web3 js bundles](https://github.com/ChainSafe/web3.js/tree/1.x/dist)
* `npm install lite-server`
* `npm install @truffle/contract` (***)

## 12. ERC20 Crowd Sale Website

* The `bs-config.json` file is used with lite-server. It adds the `token-sale/contracts/build/` path to our resource path.

* The bootstrap, truffle-contract (depreciated), and web3 minified JS files are added to the project.
  * It would be good to figure out how to import them from npm modules.
  * Web3 appears to have serious issues with svelte, and potentially other frameworks.

* **Big Number manipulation**: See [here](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber--methods).
  * (Note: This is needed for web3 wei conversions. BigInt is not supported because Safari does not support it yet...)

* I have updated `app.js` such that it updates at an interval.

* The `await window.ethereum.enable()` is required to request to connect to MetaMask.

* Need to be **careful of units**
  * Token price is: smallest unit of DAPP <-> WEI
  * I added conversion functions between **miniDapp** (BigNumber integer) and **DAPP** (String decimal)

## 13. Buying tokens

* We will create a `buyTokens` function that runs when the form is submitted.
  * `onsubmit="App.buyTokens; return false;"` return false is for preventing default. (*)

* We can also create a `listenForEvents` function - but I will ignore this since I am using an old version of Truffle which does not seem to work right.

