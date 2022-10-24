// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    // constructor() {

    // }
    uint256 public favouriteNumber;

    struct Student {
        string name;
        uint rollNo;
    }

    Student[] public studentList;

    function getFavouriteNumber() public view returns (uint256) {
        return favouriteNumber;
    }

    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function addStudent(string memory _name, uint _rollNo) public {
        studentList.push(Student(_name, _rollNo));
    }
}
