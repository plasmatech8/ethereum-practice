let token;
DappToken.deployed().then(e => token = e);
const sender = accounts[0];
const reciever = "0xF2A3cE8ba43A4224d480Be519E700D25a047f0C6";

// Check decimals
let decimals;
token.decimals().then(n => decimals = n.toNumber());

// Check balances
token.balanceOf(sender).then(n => n.toNumber());
token.balanceOf(reciever).then(n => n.toNumber());

// Check balances after transfer
token.transfer(reciever, 1000);
token.balanceOf(sender).then(n => n.toNumber());
token.balanceOf(reciever).then(n => n.toNumber());