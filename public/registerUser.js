document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.getElementById('registerForm');

    if (form) {
        // Add event listener to the form submit
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const message = await response.text();
                    alert(message);
                } else {
                    const error = await response.text();
                    alert(`Failed to register: ${error}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error('Register form not found in DOM');
    }
});
