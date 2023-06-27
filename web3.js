async function submitArticle() {
    // Check if Web3 is injected by a browser extension like MetaMask
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const contractAddress = '0x4dCb3e7fBE69CEb99eF1fBb7a8d126106919e3Fb'; 
        const abi = [
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
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "article",
                        "type": "string"
                    }
                ],
                "name": "submitArticle",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        
        // Create contract instance
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Get user account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Retrieve the file or typed text
        const fileInput = document.getElementById('fileInput');
        const articleText = document.getElementById('articleText');
        let content = '';

        // Check if a file was uploaded
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                content = event.target.result;
                // Call the smart contract function
                contract.methods.submitArticle(content).send({ from: account });
            };
            
            reader.readAsText(file);
        } else if (articleText.value) {
            content = articleText.value;
            // Call the smart contract function
            contract.methods.submitArticle(content).send({ from: account });
        } else {
            alert('Please upload a file or type your article before submitting.');
        }
    } else {
        alert('Please install MetaMask to interact with the Ethereum blockchain.');
    }
}


