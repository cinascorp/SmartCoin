pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
contract DecentralizedAI is ReentrancyGuard {    using Address for address;
    IERC20 public token;
    address public aiModel;
    struct DataRequest {        uint256 value;
        bytes32 zkp;
        bool completed;    }
    mapping(address => DataRequest) public dataRequests;
    mapping(address => uint256) public accountBalances;
    event DataRequestCreated(address indexed user, uint256 value, bytes32 zkp);    event DataRequestCompleted(address indexed user, uint256 value, bytes32 zkp);
    constructor(address _token) {
        token = IERC20(_token);    }
    function setModel(address _aiModel) external {
        require(msg.sender == aiModel, "Only the current AI model can update the AI model address.");        aiModel = _aiModel;
    }
    function requestDataProcessing(uint256 _value, bytes32 _zkp) external nonReentrant {        require(accountBalances[msg.sender] >= _value, "Insufficient funds.");
        require(dataRequests[msg.sender].completed, "Previous request must be completed.");
        dataRequests[msg.sender] = DataRequest({value: _value, zkp: _zkp, completed: false});
        emit DataRequestCreated(msg.sender, _value, _zkp);    }
    function completeDataProcessing(address _user, bytes32 _zkp) external {
        require(msg.sender == aiModel, "Only the AI model can complete data processing.");        require(!dataRequests[_user].completed, "Data request is already completed.");
        require(dataRequests[_user].zkp == _zkp, "Invalid zero-knowledge proof.");
        dataRequests[_user].completed = true;        accountBalances[_user] -= dataRequests[_user].value;
        emit DataRequestCompleted(_user, dataRequests[_user].value, _zkp);
    }
    function deposit(uint256 _amount) external nonReentrant {        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed.");
        accountBalances[msg.sender] += _amount;
    }
    function withdraw(uint256 _amount) external nonReentrant {        require(accountBalances[msg.sender] >= _amount, "Insufficient funds.");
        accountBalances[msg.sender] -= _amount;
        require(token.transfer(msg.sender, _amount), "Transfer failed.");    }
}
