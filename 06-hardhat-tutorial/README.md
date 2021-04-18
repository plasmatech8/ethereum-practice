# Hardhat Tutorial

Tutorial from: https://www.youtube.com/watch?v=9Qpi80dQsGU

Which is the same as: https://hardhat.org/tutorial/

Hardhat Docs: https://hardhat.org/getting-started/

- [Hardhat Tutorial](#hardhat-tutorial)
  - [01. Initialisation](#01-initialisation)
    - [Initialise a project](#initialise-a-project)
    - [Install plugins](#install-plugins)
  - [02. Creating Contracts](#02-creating-contracts)
  - [03. Testing Contracts](#03-testing-contracts)
  - [04. Deployment](#04-deployment)
    - [Deploy script](#deploy-script)
    - [Deploy to hardhat local](#deploy-to-hardhat-local)
    - [Deploy to Rinkeby testnet](#deploy-to-rinkeby-testnet)
  - [05. Frontend](#05-frontend)

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
npm install -D @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle chai ethereum-waffle
```
* `hardhat-ethers` allows us to use ethers library within hardhat
* `hardhat-waffle` for smart contract testing

We will add `require` to our `hardhat.config.js` for ethers and  waffle.

## 02. Creating Contracts

Create a contract:
```solidity
// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.0;

contract Token {
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) public balanceOf;

    constructor(){
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        require(balanceOf[msg.sender] >= amount, 'Not enough tokens');
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
    }
}
```

We can then build using `npx hardhat compile`.

This will create an `artifacts` and `cache` directory.

## 03. Testing Contracts

We will create tests.

Make sure that `ethereum-waffle` is installed.

We will be using ethers.

## 04. Deployment

### Deploy script
```
mkdir scripts
touch scripts/deployment.js
```
We can create a script:
```js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account" ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance ${balance.toString()}`);

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy();
  console.log(`Token address: ${token.address}`);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
})
```
And run it using `npx hardhat run scripts/deploy.js`.

This will deploy to a temporary blockchain which is immediately terminated (use for testing).

### Deploy to hardhat local

Deploy to local hardhat blockchain
```
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```
TODO: finish - can't get it to work - hardhat node acts like normal hardhat command.

### Deploy to Rinkeby testnet

To deploy to Rinkeby testnet
* Update `hardhat.config.js` to include a new network.
```
npx hardhat run --network rinkeby scripts/deploy.js
```
TODO: finish - don't have Infura, don't want to wait for Rinkeby node to syncronise.

## 05. Frontend

Connecting to frontend is same as with Truffle.

Truffle gives us an artifact JSON file.

Hardhat also give us an artifact JSON file, but it does not give us the address - so we need to
do more work.
