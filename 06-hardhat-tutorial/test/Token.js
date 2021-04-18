const { expect } = require('chai');

describe('Token contract', () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    // Completely resets the smart contract before each test
    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe('Deployment', () => {

    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should assign total supply to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      const totalSupply = await token.totalSupply();
      console.log(ownerBalance.toString(), totalSupply.toString())
      expect(totalSupply).to.equal(ownerBalance);
    });

  });

  describe('Transactions', () => {

    it('Should transfer tokens between accounts', async () => {
      // Transfer from owner to addr1
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it('Should fail if sender does not have enough tokens', async () => {
      // Transaction should be reverted and sender balance should not change
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await expect(token.connect(addr1).transfer(owner.address, 1))
        .to.be.revertedWith('Not enough tokens');   // Waffle testing
      expect(await token.balanceOf(owner.address))
        .to.equal(initialOwnerBalance);
    });

    it('Should update balances after transfers', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);
      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await token.balanceOf(addr1.address);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr1Balance).to.equal(100);
      expect(addr2Balance).to.equal(50);
    });

  });

});