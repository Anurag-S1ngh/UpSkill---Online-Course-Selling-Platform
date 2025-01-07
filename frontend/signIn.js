const signInButton = document.querySelector('#signIn');

const signInEmailInput = document.querySelector("#emailSignIn");
const signInPasswordInput = document.querySelector('#passwordSignIn');

const client = document.getElementById('options');

signInButton.addEventListener("click", async () => {
    try {
        const route = client.value === 'learner' ? 'user' : "admin";
        const response = await axios.post(`http://localhost:3000/${route}/signin`, {
            email: signInEmailInput.value,
            password: signInPasswordInput.value,
        });

        if (response.data.msg === "done") {
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            window.location.href = "http://localhost:3000/";
        } 
    } catch (e) {
        // Check if the error is a 401 status and handle it gracefully
        if (e.response && e.response.status === 401) {
            alert("Wrong password");
        } else if (e.response && e.response.status === 400) {
            alert("You haven't sign up as user, try to sign up as a user or sign in as mentor")
        }
    }
});

