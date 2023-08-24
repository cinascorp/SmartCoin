// Function to send the article to OpenAI
function sendToOpenAI(articleContent) {
  const apiKey = document.getElementById('apiKey').value;
  const prompt = "SmartCoin: " + articleContent;

  fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100
    })
  })
  .then(response => response.json())
   .then(data => {
    const responseText = data.choices[0].text;
    document.getElementById('openaiResponse').innerText = responseText;

    // Example logic to verify the article based on the OpenAI response
    if (responseText.includes("valid")) { // Adjust this condition as needed
      // Call the function in the SmartCoin contract to reward the user
      rewardUser(); // You'll need to define this function in web3.js
    }
  })
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
