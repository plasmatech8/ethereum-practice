const DappTokenSale = artifacts.require("./DappTokenSale.sol");
const DappToken = artifacts.require("./DappToken.sol");

contract('DappTokenSale', function(accounts) {
  var saleInstance;
  var tokenInstance;

  before(async function() {
    // Initialise contracts and give the token sale contract some DAPP
    saleInstance =  await DappTokenSale.deployed();
    tokenInstance =  await DappToken.deployed();
    await tokenInstance.transfer(saleInstance.address, 1000)
  });

  it('initialises the contract', async function(){
    // Check valid sale address, token address, and that the token price is correct
    const instance =  await DappTokenSale.deployed();
    assert.notEqual(instance.address, 0x0, 'sale contract has bad address')
    const tokenContract = await instance.tokenContract(); // (contract address string)
    assert.notEqual(tokenContract, 0x0, 'token contract has bad address')
    const tokenPrice = await instance.tokenPrice();
    assert.equal(tokenPrice, 1000000000000000, 'token price should be 10^15 WEI / 0.001 ETH')
  });

  it('facilitates token buying', async function(){
    const buyer = accounts[3];

    // Buy 100 DAPP
    const buyerBalanceBefore = await tokenInstance.balanceOf(buyer);
    const saleBalanceBefore = await tokenInstance.balanceOf(saleInstance.address);
    const tokenPrice = await saleInstance.tokenPrice();
    const reciept = await saleInstance.buyTokens({ from: buyer, value: tokenPrice * 100.4 });
    const buyerBalanceAfter = await tokenInstance.balanceOf(buyer);
    const saleBalanceAfter = await tokenInstance.balanceOf(saleInstance.address);
    assert.equal(buyerBalanceBefore.toNumber() + 100, buyerBalanceAfter.toNumber(), 'buyer should have gained 100 DAPP')
    assert.equal(saleBalanceBefore.toNumber() - 100, saleBalanceAfter.toNumber(), 'sale should have lost 100 DAPP')

    // Examine reciept
    assert.equal(reciept.logs[0].args._buyer, buyer, 'event should show correct buyer address');
    assert.equal(reciept.logs[0].args._amount, 100, 'event should show 100 DAPP purchase');

    // Fails if exceeds the contract balance
    try {
      await saleInstance.buyTokens({ from: buyer, value: tokenPrice * 2000 });
      assert.fail('transaction should have failed');
    } catch(error) {
      assert(error.message !== 'transaction should have failed', 'transaction should have failed');
      assert(error.message.includes('revert'), 'error message must contain revert');
    }
  });

  it('ends token sale', async function(){

    // Test end sale from non-admin account
    try {
      await saleInstance.endSale({ from: accounts[1] });
      assert.fail('transaction should have failed');
    } catch(error) {
      assert(error.message !== 'transaction should have failed', 'transaction should have failed');
      assert(error.message.includes('revert'), 'error message must contain revert');
    }

    // Test end sale as admin account
    const adminTokensBefore = await tokenInstance.balanceOf(accounts[0]);
    const adminEtherBefore = await web3.eth.getBalance(accounts[0]);
    const contractTokens = await tokenInstance.balanceOf(saleInstance.address);
    const contractEther = await web3.eth.getBalance(saleInstance.address);

    const reciept = await saleInstance.endSale({ from: accounts[0] });

    const adminTokensAfter = await tokenInstance.balanceOf(accounts[0])
    const adminEtherAfter = await web3.eth.getBalance(accounts[0]);
    const gasUsed = reciept.receipt.gasUsed;
    const gasPrice = await web3.eth.getGasPrice();

    assert.equal(
      adminTokensBefore.toNumber() + contractTokens.toNumber(),
      adminTokensAfter.toNumber(),
      "Tokens not transfered properly"
    );
    assert.equal(
      BigInt(adminEtherBefore) + BigInt(contractEther) - BigInt(gasUsed)*BigInt(gasPrice),
      BigInt(adminEtherAfter),
      "Ether not transfered properly"
    );
  });

});