// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.0;

import "./DappToken.sol";
import "./SafeMath.sol";


contract DappTokenSale {
    // Sale data
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold = 0;

    // Initialisation
    using SafeMath for uint256;
    constructor(DappToken _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
    event Sell(address _buyer, uint256 _amount);

    // Sale methods
    function buyTokens() public payable returns (bool){
        uint256 paymentValue = msg.value;
        uint256 tokensBought = paymentValue.div(tokenPrice);
        tokenContract.transfer(msg.sender, tokensBought);
        tokensSold += tokensBought;
        emit Sell(msg.sender, tokensBought);
        return true;
    }

}