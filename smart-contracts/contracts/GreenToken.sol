// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * GreenEnergyToken (ERC20)
 * - Backend mints ERC20 tokens for users via logEnergy
 * - Each unit = 1 GREEN token
 * - Still keeps a log of each "energy event" like the NFT version
 */
contract GreenEnergyToken is ERC20, Ownable {
    address public backend; 
    uint256 private _logId; // like tokenId for logs

    struct EnergyData {
        uint256 units;
        uint256 timestamp;
        address user;
    }

    // logId → energy data
    mapping(uint256 => EnergyData) public energyInfo;

    event EnergyLogged(
        address indexed user,
        uint256 indexed logId,
        uint256 units,
        uint256 timestamp
    );

    constructor(address initialOwner)
        ERC20("Green Energy Token", "GREEN")
        Ownable(initialOwner)
    {}

    modifier onlyBackend() {
        require(msg.sender == backend, "Not authorized: backend only");
        _;
    }

    function setBackend(address _backend) external onlyOwner {
        backend = _backend;
    }

    /// @notice Log an energy event and mint ERC20 tokens to user
    function logEnergy(address user, uint256 units) external onlyBackend returns (uint256) {
        require(units > 0, "Units must be > 0");

        _logId++;
        uint256 newLogId = _logId;

        // Mint ERC20 tokens
        _mint(user, units * 10 ** decimals());

        // Save log data
        energyInfo[newLogId] = EnergyData({
            units: units,
            timestamp: block.timestamp,
            user: user
        });

        emit EnergyLogged(user, newLogId, units, block.timestamp);

        return newLogId;
    }
}
