document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginFeedback = document.getElementById('loginFeedback');

    loginButton.addEventListener('click', () => {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const loginPayload = {
            username: loginUsername,
            password: loginPassword
        };

        const loginUrl = 'https://api.ayoba.me/v2/login';

        loginApiRequest(loginUrl, loginPayload)
            .then(responseData => {
                loginFeedback.textContent = `Login Response: ${JSON.stringify(responseData, null, 2)}`;
                console.log('Login response data:', responseData);
                loginFeedback.style.color = 'green';
                console.log('Login response data:', responseData);
            })
            .catch(error => {
                loginFeedback.textContent = 'Login failed. Please check your credentials.';
                loginFeedback.style.color = 'red';
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
        return responseData;
    } catch (error) {
        console.error('Error performing login request:', error);
        throw error;
    }
}
