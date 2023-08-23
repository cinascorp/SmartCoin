pragma solidity ^0.8.0;

contract SmartCoin {
  string public constant name = "Smart Coin";
  string public constant symbol = "SMC";
  uint256 public constant decimals = 18;
  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  event Transfer(address indexed from, address indexed to, uint256 value);

  constructor(uint256 initialSupply) {
    totalSupply = initialSupply;
    balanceOf[msg.sender] = initialSupply;
  }

  function transfer(address to, uint256 value) public returns (bool) {
    require(balanceOf[msg.sender] >= value, "Insufficient balance");

    balanceOf[msg.sender] -= value;
    balanceOf[to] += value;

    emit Transfer(msg.sender, to, value);
    return true;
  }
}

contract ArticleContract {
  struct Article {
    string content;
    bool isVerified;
  }

  mapping(address => Article[]) public userArticles;
  mapping(address => uint256) public tokenBalance;
  uint256 public constant REWARD_AMOUNT = 1;

  SmartCoin public smartCoin;

  constructor(uint256 initialSupply) {
    smartCoin = new SmartCoin(initialSupply);
  }

  function submitArticle(string memory content) public {
    Article memory newArticle = Article(content, false);
    userArticles[msg.sender].push(newArticle);
  }

  function verifyArticle(address user, uint256 articleIndex) public {
    require(articleIndex < userArticles[user].length, "Invalid article index");
    require(!userArticles[user][articleIndex].isVerified, "Article already verified");

    userArticles[user][articleIndex].isVerified = true;
    tokenBalance[user] += REWARD_AMOUNT;

    smartCoin.transfer(user, REWARD_AMOUNT);
  }
}
