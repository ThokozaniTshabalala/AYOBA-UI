document.addEventListener('DOMContentLoaded', () => {
  const sendMessageButton = document.getElementById('sendMessageButton');

  sendMessageButton.addEventListener('click', () => {
      const messageText = document.getElementById('messageText').value;

      if (messageText.trim() !== "") {
          const phoneNumber = '+27698061824'; // Constant phone number
          const payload = {
              msisdns: [phoneNumber],
              message: {
                  type: "text",
                  text: messageText
              }
          };

          const apiUrl = 'https://api.ayoba.me/v1/business/message';
          const token = localStorage.getItem('accessToken'); // Retrieve the stored access token

          sendApiRequest(apiUrl, token, payload);

          addMessageToChat(messageText);
          document.getElementById('messageText').value = ""; // Clear input
      }
  });
});

async function sendApiRequest(url, token, data) {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData); // Handle the response data

      // You can also update the UI based on the response
  } catch (error) {
      console.error('Error performing API request:', error);
  }
}

function addMessageToChat(message) {
  const conversation = document.querySelector('.conversation');
  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble', 'sent');
  messageBubble.innerText = message;
  conversation.appendChild(messageBubble);
  conversation.scrollTop = conversation.scrollHeight; // Scroll to the bottom
}
