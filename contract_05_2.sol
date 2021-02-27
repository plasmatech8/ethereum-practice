pragma solidity ^0.5.1;

contract MyContract {

    mapping(uint => Person) public people;
    uint256 public peopleCount;
    uint256 public openingTime = 1613306320; // Some second timestamp

    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
    }

    modifier onlyAfterOpeningTime() {
        require(block.timestamp >= openingTime); // Raises an error if false
        _;
    }

    // onlyOwner = custom modifier
    function addPerson(string memory _firstName, string memory _lastName) public onlyAfterOpeningTime {
        incrementCount();
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
    }

    // internal = only accessible from within contract
    function incrementCount() internal {
        peopleCount += 1;
    }
}