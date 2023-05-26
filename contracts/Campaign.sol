// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle, 
        uint requiredCampaignAmount, 
        string memory imgURI, 
        string memory category,
        string memory storyURI) public
    {

        Campaign newCampaign = new Campaign(
            campaignTitle, requiredCampaignAmount, imgURI, storyURI, msg.sender);
        

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle, 
            requiredCampaignAmount, 
            msg.sender, 
            address(newCampaign),
            imgURI,
            block.timestamp,
            category
        );

    }
}


contract Campaign {
    // string public title;
    // uint public requiredAmount;
    // string public image;
    // string public story;
    // address payable public owner;
    // uint public receivedAmount;

    struct details{
    string title;
    uint  requiredAmount;
    string  image;
    string  story;
    address payable  owner;
    uint  receivedAmount;
    }

    details ddetails;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory campaignTitle, 
        uint requiredCampaignAmount, 
        string memory imgURI,
        string memory storyURI,
        address campaignOwner
    ) {
        ddetails.title = campaignTitle;
        ddetails.requiredAmount = requiredCampaignAmount;
        ddetails.image = imgURI;
        ddetails.story = storyURI;
        ddetails.owner = payable(campaignOwner);
    }

    function donate() public payable {
        require(ddetails.requiredAmount > ddetails.receivedAmount, "required amount fullfilled");
        ddetails.owner.transfer(msg.value);
        ddetails.receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }

    function getdetails() public view returns(details memory){
        return ddetails;
    }
}

