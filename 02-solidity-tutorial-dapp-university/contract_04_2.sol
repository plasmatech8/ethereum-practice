pragma solidity ^0.5.1;

contract MyContract {
    mapping(uint => Person) public people;
    uint256 public peopleCount;

    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
    }

    function addPerson(string memory _firstName, string memory _lastName) public {
        people[peopleCount] = Person(peopleCount, _firstName, _lastName);
        peopleCount += 1;
    }
}