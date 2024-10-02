document.addEventListener("DOMContentLoaded", function() {
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageText = document.getElementById('messageText');
    const conversation = document.getElementById('conversation');
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

    async function fetchMessages() {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const messages = await response.json();
            displayMessages(messages);
        } else {
            console.error('Failed to fetch messages:', response.statusText);
        }
    }

    function startPollingForMessages() {
        setInterval(fetchMessages, 5000); // Poll every 5 seconds
    }

    function displayMessages(messages) {
        messages.forEach(msg => {
            const text = msg.message.text;
            displayMessage(text, 'received');
        });
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function formatTime(date) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function displayMessage(text, type) {
        const messageBubble = document.createElement('div');
        const timestamp = document.createElement('span');
        const now = new Date();

        messageBubble.classList.add('message-bubble', type);
        messageBubble.textContent = text;

        timestamp.classList.add('timestamp');
        timestamp.textContent = formatTime(now);
        messageBubble.appendChild(timestamp);

        // Check if a date separator is needed
        const lastMessage = conversation.lastElementChild;
        if (!lastMessage || !lastMessage.classList.contains('date-separator') || formatDate(now) !== lastMessage.textContent) {
            const dateSeparator = document.createElement('div');
            dateSeparator.classList.add('date-separator');
            dateSeparator.textContent = formatDate(now);
            conversation.appendChild(dateSeparator);
        }

        conversation.appendChild(messageBubble);
        conversation.scrollTop = conversation.scrollHeight;
    }

    startPollingForMessages(); // Start polling for messages on page load
});
