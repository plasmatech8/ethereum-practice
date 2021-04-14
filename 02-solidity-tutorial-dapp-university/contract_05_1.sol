pragma solidity ^0.5.1;

contract MyContract {

    mapping(uint => Person) public people;
    uint256 public peopleCount;
    address public owner;

    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
    }

    modifier onlyOwner() {
        require(msg.sender == owner); // Raises an error if false
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    // onlyOwner = custom modifier
    function addPerson(string memory _firstName, string memory _lastName) public onlyOwner {
        incrementCount();
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
    }

    // internal = only accessible from within contract
    function incrementCount() internal {
        peopleCount += 1;
    }
}