// Function to send the article to OpenAI
function sendToOpenAI(articleContent) {
  const apiKey = document.getElementById('apiKey').value;
  const promptQuestion = "Please analyze this article and determine if it contains valid and logical information. If so, provide a brief summary and validation status.";
  const prompt = "SmartCoin: " + promptQuestion + "\n\n" + articleContent;

  fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 2000
    })
  })
  .then(response => response.json())
  .then(data => {
    const responseText = data.choices[0].text;
    document.getElementById('openaiResponse').innerText = responseText;

    // Analyze the response and decide whether to reward the user
    if (responseText.includes("valid")) { // Change this condition as needed
      const userAddress = web3.eth.accounts[0]; // Get the user's address from MetaMask
      const rewardAmount = 10; // Set the reward amount as needed

      // Call the rewardUser function to send the reward on the blockchain
      rewardUser(userAddress, rewardAmount);
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// Function to submit the article
function submitArticle() {
  const fileInput = document.getElementById('fileInput');
  const articleText = document.getElementById('articleText');
  let articleContent;

  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      articleContent = e.target.result;
      sendToOpenAI(articleContent);
    };
    reader.readAsText(fileInput.files[0]);
  } else {
    articleContent = articleText.value;
    sendToOpenAI(articleContent);
  }
}

// Function to hide the API key input field
function hideApiKey() {
  document.getElementById('apiKeyMenu').style.display = 'none';
}

// Add event listener to the submit button
document.getElementById('submitButton').addEventListener('click', submitArticle);
