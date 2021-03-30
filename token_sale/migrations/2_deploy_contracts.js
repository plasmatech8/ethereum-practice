const DappToken = artifacts.require("./DappToken.sol");
const DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = async function (deployer) {
  // > If based on a specified USD market cap:
  // marketCap  = 1,000 USD
  // USD/mDAPP  = marketCap/numTokens     = 1,000 / 1,000,000   = 0.001 USD ($1 per DAPP)
  // USD/wei    = EthPrice/EthDecimals    = 2,300 / 10^18       = 2.3e-15 USD
  // wei/mDAPP  =  (USD/mDAPP)/(USD/wei)  = 0.001 / 2.3e^-15    = 434782608696 wei
  // const tokenPrice = 434782608696;
  // > If based simply on number of ETH:
  // ETH/DAPP = 0.1 ETH
  // wei/mDAPP = (ETH/DAPP) * (ethDecimals / dappDecimals) = 0.1 * (10^18 / 10^3) = 10^14 wei
  const tokenPrice = BigInt(1e14);

  await deployer.deploy(DappToken);
  await deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);

  // Send 500 DAPP from accounts[0] to the token sale
  const dappToken = await DappToken.deployed();
  const dappTokenSale = await DappTokenSale.deployed();
  await dappToken.transfer(dappTokenSale.address, 500 * 1e3);

  // Buy 80 DAPP as a test
  await dappTokenSale.buyTokens({ value: 80 * 1e17 });
};
