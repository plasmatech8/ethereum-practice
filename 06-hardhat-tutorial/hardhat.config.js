/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('ethers')
require('@nomiclabs/hardhat-waffle')

const PRIVATE_KEY = '1234567890';
const INFURA_URL = 'localhost'; // for connecting to Rinkeby node - will point to local geth node instead of infura

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
