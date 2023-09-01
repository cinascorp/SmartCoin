// SPDX-License-Identifier: Cinscorp
pragma solidity ^0.8.18;

contract SmartCoin {
    // ERC20-like Token Implementation
    string public constant name = "Smart Coin";
    string public constant symbol = "SMC";
    uint256 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    // Owner of the contract
    address public owner;

    // Article Management
    struct Article {
        string content;
        bool isVerified;
    }
    mapping(address => Article[]) public userArticles;
    mapping(bytes32 => bool) public articleHashes;
    uint256 public constant REWARD_AMOUNT = 1;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event ArticleSubmitted(address indexed user, string article);
    event ArticleVerified(address indexed user, uint256 articleIndex);
    event Reward(address indexed user, uint256 amount); // New Reward event

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        owner = msg.sender; // Set the owner as the contract deployer
    }

    // Token Transfer Function
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    // Article Submission Function
    function submitArticle(string memory content) public {
        Article memory newArticle = Article(content, false);
        userArticles[msg.sender].push(newArticle);
        emit ArticleSubmitted(msg.sender, content);
    }

    // Article Verification and Reward Function
    function verifyArticle(address user, uint256 articleIndex, bytes32 articleHash) public {
        require(articleIndex < userArticles[user].length, "Invalid article index");
        require(!userArticles[user][articleIndex].isVerified, "Article already verified");
        require(!articleHashes[articleHash], "Article hash already submitted");

        userArticles[user][articleIndex].isVerified = true;
        articleHashes[articleHash] = true;

        balanceOf[user] += REWARD_AMOUNT;
        totalSupply += REWARD_AMOUNT;

        emit ArticleVerified(user, articleIndex);
    }

    // Rewarding function 
    function rewardUser(address user, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can reward users");
        require(balanceOf[owner] >= amount, "Insufficient balance"); // Use balanceOf instead of tokenBalance
    
        balanceOf[owner] -= amount;
        balanceOf[user] += amount;

        emit Reward(user, amount);
    }
}
