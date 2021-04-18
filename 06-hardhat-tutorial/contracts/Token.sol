// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;

contract Token {
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) public balanceOf;

    constructor(){
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        require(balanceOf[msg.sender] >= amount, 'Not enough tokens');
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
    }
}