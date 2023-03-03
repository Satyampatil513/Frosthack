// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DAOContract {
    struct StartUp {
      address owner;
      string title;
      string description;
      uint256 target;
      uint256 deadline;
      uint256 amountCollected;
      string image;
      address[] investors;
      uint256[] investments;
    }
  
  mapping(uint256 => StartUp) public StartUps;

  uint256 public numberOfStartUps = 0;

  function createStartUp(address _owner,string memory _title, string memory _description , uint256 _target ,uint256 _deadline, string memory _image) public returns (uint256) {
    StartUp storage startup = StartUps[numberOfStartUps] ;

    require(startup.deadline < block.timestamp, "The deadline should be the date in the future.");
    startup.owner = _owner;
    startup.title = _title ;
    startup.description = _description;
    startup.target = _target ;
    startup.deadline = _deadline;
    startup.amountCollected = 0;
    startup.image = _image;

    numberOfStartUps++;

    return numberOfStartUps - 1 ;
  }

  function investToStartUp(uint256 _id) public payable {
    uint256 amount = msg.value;
    StartUp storage startup = StartUps[_id] ;

    startup.investors.push(msg.sender);
    startup.investments.push(amount);

    (bool sent,) = payable(startup.owner).call{value: amount}("");

    if(sent){
      startup.amountCollected = startup.amountCollected + amount;
    }
  }

  function getInvestors(uint256 _id) view public returns (address[] memory, uint256[] memory) {
    return(StartUps[_id].investors, StartUps[_id].investments);
  }

  function getStartUps() public view returns (StartUp[] memory){
    StartUp[] memory allStartUps = new StartUp[](numberOfStartUps);

    for(uint i = 0; i < numberOfStartUps; i++){
      StartUp storage item = StartUps[i];

      allStartUps[i] = item;
    }

    return allStartUps;
  }  
}