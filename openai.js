// Function to send a request to OpenAI's text.davinci-003 model
function sendRequestToOpenAI(articleContent, apiKey) {
  // Endpoint for the text.davinci-003 model
  const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";

  // Prompt to be sent to OpenAI (customize as needed)
  const prompt = `SmartCoin Article Verification: ${articleContent}`;

  // Request payload
  const payload = {
    prompt: prompt,
    max_tokens: 150
  };

  // Request headers
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  // Send the request using the Fetch API
  fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => processResponse(data))
  .catch(error => console.error("Error sending request to OpenAI:", error));
}

// Function to process the response from OpenAI
function processResponse(data) {
  // Extract the response text
  const responseText = data.choices[0].text;

  // Process the response (customize as needed)
  // For example, you can verify the article, update the UI, etc.

  // Example: Display the response in the UI
  document.getElementById('openaiResponse').innerText = responseText;
}

// Function to hide the API key input field
function hideApiKey() {
  document.getElementById('apiKeyMenu').style.display = "none";
}

// Example: Add an event listener to the "Submit Article" button
document.getElementById('submitArticle').addEventListener('click', () => {
  const articleContent = document.getElementById('article').value;
  const apiKey = document.getElementById('apiKey').value;
  sendRequestToOpenAI(articleContent, apiKey);
});

// Example: Add an event listener to the "Hide" button for the API key
document.getElementById('hideApiKey').addEventListener('click', hideApiKey);
