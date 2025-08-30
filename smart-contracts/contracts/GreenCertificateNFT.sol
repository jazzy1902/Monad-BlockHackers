// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenCertificateNFT is ERC721URIStorage, Ownable {
    address public backend;
    uint256 private _tokenIds;

    struct EnergyData {
        uint256 units;
        uint256 timestamp;
    }

    mapping(uint256 => EnergyData) public energyInfo;

    event EnergyLogged(
        address indexed user,
        uint256 indexed tokenId,
        uint256 units,
        uint256 timestamp
    );

    constructor() ERC721("Green Certificate", "GREEN-NFT") Ownable(msg.sender) {}

    modifier onlyBackend() {
        require(msg.sender == backend, "Not authorized: backend only");
        _;
    }

    function setBackend(address _backend) external onlyOwner {
        backend = _backend;
    }

    function logEnergy(
        address user,
        uint256 units,
        string memory tokenURI
    ) external onlyBackend returns (uint256) {
        require(units > 0, "Units must be > 0");
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(user, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        energyInfo[newTokenId] = EnergyData({
            units: units,
            timestamp: block.timestamp
        });

        emit EnergyLogged(user, newTokenId, units, block.timestamp);
        return newTokenId;
    }
}
