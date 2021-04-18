# Hardhat Tutorial

- [Hardhat Tutorial](#hardhat-tutorial)
  - [01. Initialisation](#01-initialisation)
    - [Initialise a project](#initialise-a-project)
    - [Install plugins](#install-plugins)

## 01. Initialisation

### Initialise a project
```
npm init -y
npm install -D hardhat
npx hardhat
> Create an empty hardhat.config.js
```

After we initialised a hardhat project, we can use the `npx hardhat` command to view options.

![](img/2021-04-18-14-31-46.png)

### Install plugins

```
npm install -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle chai
```
* `hardhat-ethers` allows us to use ethers library within hardhat
* `hardhat-waffle` for smart contract testing

We will add `require` to our `hardhat.config.js` for ethers and  waffle.