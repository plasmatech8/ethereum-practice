pragma solidity ^0.5.1;

contract MyContract {

    // 1) Functionality for an ICO.
    // Must explicitly state when things are payable

    mapping(address => uint256) public balances;
    address payable wallet;

    constructor(address payable _wallet) public {
        wallet = _wallet;
    }

    function buyToken() public payable {
        // Give token to sender
        balances[msg.sender] += 1; // Address of the sender

        // Transfer ether from sender to wallet
        wallet.transfer(msg.value); // The value - how much ether is sent in the call

        // Trigger an event
        //emit Purchase(msg.sender, 1);
    }

    // 2) Fallback function: called when an non-defined function is called.
    // Has no name or arguments or return value.

    function() external payable {
        buyToken();
    }

    // 3) Events: used to allow external consumers to listen/subscribe to things.
    // We can also set a parameter to 'indexed' to allow us to filter events so
    // we only listen to certain buyers/things.

    event Purchase(address indexed _buyer, uint256 _amount);

}