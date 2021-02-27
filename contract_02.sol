pragma solidity ^0.5.1;

contract MyContract {

    // Define contract variables
    //      "public" visibility (instead of using a getter function)
    //      "constant" (to make it fixed value)
    //      default value (instead of using constructor)

    string public constant myString = "myValue";
    bool public myBool = true;
    int public myInt = -1;
    uint public myUint = 1; // unsigned
    uint8 public myUint8 = 255;
    uint256 public myUint256 = 42; // (default bits is 256)

    // Define an enum type for the application state

    enum State { Waiting, Ready, Active }
    State public myState = State.Waiting;

    // Define functions to set the state and check if the state is active

    function activate() public {
        myState = State.Active;
    }

    function isActive() public view returns(bool) {
        return myState == State.Active;
    }

}