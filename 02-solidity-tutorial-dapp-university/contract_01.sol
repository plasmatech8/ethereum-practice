// Solidity greater or equal to version 0.4.24
pragma solidity ^0.4.24;


contract MyContract {

    // A variable held by the smart contract, stored on the blockchain
    string value;

    // A contructor function, which sets the value when the contract is first deployed
    constructor() public {
        value = "myValue";
    }

    // A getter function for the variable:
    //      public          -   function can be called by anyone (not just from within the contract)
    //      view            -   if a function is readonly, we should restrict or else we get a warning
    //      returns(string) -   return type
    function get() public view returns(string) {
        return value;
    }

    // A getter function for the variable
    function set(string _value) public {
        value = _value;
    }
}