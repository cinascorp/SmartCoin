// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SmartCoin {
    IERC20 public token;
    mapping(bytes32 => bool) public articleHashes;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function storeArticleHash(bytes32 _hash) public {
        require(!articleHashes[_hash], "Article already submitted");
        articleHashes[_hash] = true;
    }

    function distributeReward(address _recipient, uint256 _amount) public {
        require(token.balanceOf(address(this)) >= _amount, "Insufficient balance");
        token.transfer(_recipient, _amount);
    }

    // Additional functions as needed
}
