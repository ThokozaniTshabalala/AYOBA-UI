document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginFeedback = document.getElementById('loginFeedback');
    const responseBox = document.getElementById('responseBox');

    loginButton.addEventListener('click', () => {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const loginPayload = {
            username: loginUsername,
            password: loginPassword
        };

        const loginUrl = 'https://api.ayoba.me/v2/login';

        loginApiRequest(loginUrl, loginPayload)
            .then(accessToken => {
                loginFeedback.textContent = 'Login successful!';
                loginFeedback.style.color = 'green';
                responseBox.textContent = 'Access Token: ' + accessToken;
                console.log('Login response data:', accessToken);
                localStorage.setItem('accessToken', accessToken); // Store the access token
            })
            .catch(error => {
                loginFeedback.textContent = 'Login failed. Please check your credentials.';
                loginFeedback.style.color = 'red';
                responseBox.textContent = error.message;
                console.error('Login error:', error);
            });
    });
});

async function loginApiRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Login response data:', responseData);  // Log response data for debugging
        // Extract the access_token
        const accessToken = responseData.access_token;

        console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error performing login request:', error);
        throw error;
    }
}
