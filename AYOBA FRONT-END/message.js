document.addEventListener("DOMContentLoaded", function() {
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageText = document.getElementById('messageText');
    const apiUrl = 'https://api.ayoba.me/v1/business/message';
    const token = localStorage.getItem('accessToken'); // Retrieve the stored access token

    async function sendMessage(text) {
        const phoneNumber = '+27698061824'; // Constant phone number
        const payload = {
            msisdns: [phoneNumber],
            message: {
                type: "text",
                text: text
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Message sent:', responseData); // Log the response data

        } catch (error) {
            console.error('Error performing API request:', error);
        }
    }

    sendMessageButton.addEventListener('click', function() {
        const text = messageText.value.trim();
        if (text) {
            displayMessage(text, 'sent');
            sendMessage(text);
            messageText.value = '';
        }
    });
});
