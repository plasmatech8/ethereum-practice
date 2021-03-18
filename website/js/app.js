const web3 = new Web3('ws://localhost:7545');

web3.eth.getBalance("0x593CB082767e9B2D97e4C324b41796758A212ccB")
.then(e => {
  console.log("accounts[0] has", web3.utils.fromWei(e, "ether"));
});

console.log("app.js loaded");