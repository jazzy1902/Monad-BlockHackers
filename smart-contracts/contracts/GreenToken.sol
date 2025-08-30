// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenToken is ERC20, Ownable {
    address public backend;

    constructor() ERC20("Green Token", "GREEN") Ownable(msg.sender) {}

    modifier onlyBackend() {
        require(msg.sender == backend, "Not authorized");
        _;
    }

    function setBackend(address _backend) external onlyOwner {
        backend = _backend;
    }

    function mintToken(address to) external onlyBackend {
        _mint(to, 1 * 10 ** decimals());
    }
}
