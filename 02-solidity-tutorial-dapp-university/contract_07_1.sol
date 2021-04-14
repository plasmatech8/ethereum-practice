pragma solidity ^0.5.1;


contract ERC20Token {
    string public name;
    mapping(address => uint256) public balances;

    function mint() public {

        // !!! GOTCHYA
        // Cannot use 'msg.sender' because it is the address of the contract.
        // Use tx.origin - the address who initiated this transaction.

        balances[tx.origin]++;
    }
}

contract MyContract {

    address payable wallet;
    address public token;    // The address of our ERC20 token contract

    constructor(address payable _wallet, address _token) public {
        wallet = _wallet;
        token = _token;
    }

    function buyToken() public payable {
        // Call a function on another smart contract at an address
        ERC20Token _token = ERC20Token(address(token));
        _token.mint();

        wallet.transfer(msg.value);
    }

    function() external payable {
        buyToken();
    }
}