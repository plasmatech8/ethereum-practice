const DappToken = artifacts.require("./DappToken.sol");
const DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = async function (deployer) {
  const tokenPrice = 1000000000000000; // wei, 0.001 ETH per token

  await deployer.deploy(DappToken);
  await deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
};
