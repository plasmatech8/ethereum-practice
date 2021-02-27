pragma solidity ^0.8.0;

import "./SafeMath.sol";

contract MyToken {
    using SafeMath for uint256;   // Attach library to type for shorthand
    uint256 public value;

    function calculate(uint _value1, uint _value2) public {
        //value = SafeMath.div(_value1, _value2);
        value = _value1.div(_value2);
    }
}
