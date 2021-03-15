const DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract('DappTokenSale', function(accounts) {

  it('initialises the contract', async function(){
    const instance =  await DappTokenSale.deployed();
    assert.notEqual(instance.address, 0x0, 'sale contract has bad address')
    const tokenContract = await instance.tokenContract(); // (contract address string)
    assert.notEqual(tokenContract, 0x0, 'token contract has bad address')
    const tokenPrice = await instance.tokenPrice()
  });

});