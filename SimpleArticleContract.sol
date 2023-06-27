pragma solidity ^0.8.0;

contract SimpleArticleContract {
    
    event ArticleSubmitted(address indexed user, string article);

    function submitArticle(string memory article) public {
        emit ArticleSubmitted(msg.sender, article);
    }
}
