// Connect to MetaMask
window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      initApp(); // Initialize the app after connecting
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log('Non-Ethereum browser detected. Please install MetaMask.');
  }
});

// Initialize the app
function initApp() {
  loadContract(); // Load the SmartCoin contract
  displayUserCredit(); // Display user's ETH credit
  // Add more initialization code as needed
}

// Load the SmartCoin contract
function loadContract() {
  const contractAddress = "0x8ACa165087240589ce8DCc6a63BF8F945418945c";
  const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "article",
				"type": "string"
			}
		],
		"name": "ArticleSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "articleIndex",
				"type": "uint256"
			}
		],
		"name": "ArticleVerified",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Reward",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "rewardUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			}
		],
		"name": "submitArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "articleIndex",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "articleHash",
				"type": "bytes32"
			}
		],
		"name": "verifyArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "articleHashes",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_AMOUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userArticles",
		"outputs": [
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ;

  window.SmartCoinContract = new window.web3.eth.Contract(contractABI, contractAddress);
}

// Display user's ETH credit
async function displayUserCredit() {
  const accounts = await window.web3.eth.getAccounts();
  const balanceInWei = await window.web3.eth.getBalance(accounts[0]);
  const balanceInEth = window.web3.utils.fromWei(balanceInWei, 'ether');
  document.getElementById('userCredit').innerText = `${balanceInEth} ETH`;
}
function rewardUser() {
  const contract = new web3.eth.Contract(SmartCoinABI, SmartCoinAddress);
  const userAddress = web3.eth.accounts[0]; // Get the user's address from MetaMask

  // Call the function in the SmartCoin contract to reward the user
  contract.methods.rewardUser(userAddress).send({ from: userAddress })
    .then(receipt => {
      console.log("Reward successful:", receipt);
      // Update the user's credit display or other UI elements as needed
    })
    .catch(error => {
      console.error("Error rewarding user:", error);
    });
}

// rewarding user
function rewardUser(userAddress, amount) {
    const rewardMethod = smartCoinContract.methods.rewardUser(userAddress, amount);
    rewardMethod.send({ from: userAccount })
        .on('receipt', (receipt) => {
            console.log('Reward sent successfully', receipt);
        })
        .on('error', (error) => {
            console.error('An error occurred while sending the reward', error);
        });
}

// More functions to interact with the contract will go here
