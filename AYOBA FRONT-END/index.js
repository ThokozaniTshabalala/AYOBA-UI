document.addEventListener('DOMContentLoaded', () => {
    const sendMessageButton = document.getElementById('sendMessageButton');

    sendMessageButton.addEventListener('click', () => {
        const phoneNumber = document.getElementById('phoneNumber').value;
        const messageText = document.getElementById('messageText').value;

        if (messageText.trim() !== "") {
            const payload = {
                msisdns: [phoneNumber],
                message: {
                    type: "text",
                    text: messageText
                }
            };

            const apiUrl = 'https://api.ayoba.me/v1/business/message';
            const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjcyZDVmMDhjZjU3NjEzZmVhNzY0NjNkNGRlYzM1OGM1MDNiZjZiOTAiLCJqaWQiOiI3MmQ1ZjA4Y2Y1NzYxM2ZlYTc2NDYzZDRkZWMzNThjNTAzYmY2YjkwQGF5b2JhLm1lIiwiZ3JvdXAiOiJidXNpbmVzcyIsIm1zaXNkbiI6bnVsbCwiaWF0IjoxNzIyMTA3NzA3LCJleHAiOjE3MjIxMDk1MDd9.ns_q5i0_OV6ROTppN__u_GK8IwGF3KGpA0nn_TemTe0';

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
                'Authorization': token,
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
