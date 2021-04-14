const DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {

  it('transfer 1 DAPP to metamask wallet', async function(){
    const instance =  await DappToken.deployed();
    const recieverAddress = '0xF2A3cE8ba43A4224d480Be519E700D25a047f0C6';

    // Note: does not actually affect the live genache blockchain - but still requies it to be running
    const initialSenderBalance = await instance.balanceOf(accounts[0]);
    const initialRecieverBalance = await instance.balanceOf(recieverAddress);
    instance.transfer(recieverAddress, 1000);
    const resultSenderBalance = await instance.balanceOf(accounts[0]);
    const resultRecieverBalance = await instance.balanceOf(recieverAddress);

    assert.equal(
      initialSenderBalance.toNumber() - 1000,
      resultSenderBalance.toNumber(),
      'sender should lise 1000 DAPP tokens but did not'
    );
    assert.equal(
      initialRecieverBalance.toNumber() + 1000,
      resultRecieverBalance.toNumber(),
      'reciever should lise 1000 DAPP tokens but did not'
    );

  });

  it('get token metadata', async function() {
    const instance =  await DappToken.deployed();
    assert.equal((await instance.name()).toString(), 'DappToken', 'Incorrect token name');
    assert.equal((await instance.symbol()).toString(), 'DAPP', 'Incorrect token symbol');
    assert.equal((await instance.decimals()).toNumber(), 3, 'Incorrect decimals');
    assert.equal((await instance.totalSupply()).toNumber(), 1000000, 'Incorrect totalSupply');
  });

  it('successful transfer between two wallets', async function() {
    const instance =  await DappToken.deployed();
    const sender = accounts[0];
    const reciever = accounts[1];

    // Check balances after transfer
    const initialSenderBalance = await instance.balanceOf(sender);
    const initialRecieverBalance = await instance.balanceOf(reciever);
    await instance.transfer(reciever, 1000);  // (returns a reciept)
    const resultSenderBalance = await instance.balanceOf(sender);
    const resultRecieverBalance = await instance.balanceOf(reciever);
    assert.equal(
      initialSenderBalance.toNumber() - 1000,
      resultSenderBalance.toNumber(),
      'sender should lose 1000 DAPP tokens but did not'
    );
    assert.equal(
      initialRecieverBalance.toNumber() + 1000,
      resultRecieverBalance.toNumber(),
      'reciever should gain 1000 DAPP tokens but did not'
    );
  });

  it('failed transfer between two wallets', async function() {
    const instance =  await DappToken.deployed();
    const sender = accounts[0];
    const reciever = accounts[1];

    // Check that faulty transfer, fails and reverts
    const initialSenderBalance = await instance.balanceOf(sender);
    const initialRecieverBalance = await instance.balanceOf(reciever);
    try {
      await instance.transfer(reciever, 999999999999999);
      assert.fail('transaction should have failed');
    } catch(error) {
      assert(error instanceof Object, 'transaction should have failed');
      assert(error.message.includes('revert'), 'error message must contain revert');
    }

    const resultSenderBalance = await instance.balanceOf(sender);
    const resultRecieverBalance = await instance.balanceOf(reciever);
    assert.equal(
      initialSenderBalance.toNumber(),
      resultSenderBalance.toNumber(),
      'sender balance should not change'
    );
    assert.equal(
      initialRecieverBalance.toNumber(),
      resultRecieverBalance.toNumber(),
      'reciever balance should not change'
    );
  });

  it('succcessful approval for allowance funds delegation', async function() {
    const instance =  await DappToken.deployed();
    const sender = accounts[0];
    const delegate = accounts[1];
    const reciever = accounts[2];

    // Check that delegation works
    const initialDelegatedAmount = await instance.allowance(sender, delegate)
    const reciept = await instance.approve(delegate, 100, {from: sender})
    const resultDelegatedAmount = await instance.allowance(sender, delegate)
    assert.equal(
      initialDelegatedAmount.toNumber() + 100,
      resultDelegatedAmount.toNumber(),
      'delegate should have 0.100 DAPP allowance given by sender, but did not'
    );
    assert.equal(reciept.logs.length, 1, 'triggers one event');
    assert.equal(reciept.logs[0].event, 'Approval', 'event should be approval event');
    assert.equal(reciept.logs[0].args._owner, sender, 'owner should be sender');
    assert.equal(reciept.logs[0].args._spender, delegate, 'spender should be delegate');
    assert.equal(reciept.logs[0].args._value, 100, 'value should be 100');

    // Check that funds can be transfered
    const initialSenderBalance = await instance.balanceOf(sender);
    const initialRecieverBalance = await instance.balanceOf(reciever);
    await instance.transferFrom(sender, reciever, 100, {from: delegate})
    const resultSenderBalance = await instance.balanceOf(sender);
    const resultRecieverBalance = await instance.balanceOf(reciever);
    assert.equal(
      initialSenderBalance.toNumber() - 100,
      resultSenderBalance.toNumber(),
      'sender should have lost 0.100 DAPP due to transfer by delegate'
    );
    assert.equal(
      initialRecieverBalance.toNumber() + 100,
      resultRecieverBalance.toNumber(),
      'reciever should have recieved 0.100 DAPP due to transfer by delegate'
    );
  });

  it('failed approval for allowance funds delegation', async function() {
    const instance =  await DappToken.deployed();
    const sender = accounts[0];
    const delegate = accounts[1];
    const reciever = accounts[2];

    // Approve funds to delegate
    await instance.approve(delegate, 100, {from: sender})

    // Check that funds cannot be transfered if greater than allowance
    const initialSenderBalance = await instance.balanceOf(sender);
    const initialRecieverBalance = await instance.balanceOf(reciever);
    try {
      await instance.transferFrom(sender, reciever, 999999999999999, {from: delegate});
      assert.fail('transaction should have failed');
    } catch(error) {
      assert(error.message !== 'transaction should have failed', 'transaction should have failed');
      assert(error.message.includes('revert'), 'error message must contain revert');
    }
    const resultSenderBalance = await instance.balanceOf(sender);
    const resultRecieverBalance = await instance.balanceOf(reciever);
    assert.equal(
      initialSenderBalance.toNumber(),
      resultSenderBalance.toNumber(),
      'sender balance should not change'
    );
    assert.equal(
      initialRecieverBalance.toNumber(),
      resultRecieverBalance.toNumber(),
      'reciever balance should not change'
    );
  });

});