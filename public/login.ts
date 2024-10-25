document.getElementById('login-form')!.addEventListener('submit', async function (e: Event) {
    e.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password }), 
        });

        const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

        if (response.ok) {
            errorMessage.classList.add('hidden'); 
            setTimeout(() => {
                window.location.href = 'home.html'; 
            }, 1000);
        } else {
            errorMessage.classList.remove('hidden'); 
        }
    } catch (error) {
        console.error('Error logging in:', error);
        const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
export {};