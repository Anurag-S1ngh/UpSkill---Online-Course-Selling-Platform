const signUpUserButton = document.querySelector('#signUpUser');
const signUpAdminButton = document.querySelector('#signUpAdmin');
const signInButton = document.querySelector('#signIn');
const signInEmailInput = document.querySelector("#emailSignIn");
const signInPasswordInput = document.querySelector('#passwordSignIn');
const signUpUserUsername = document.querySelector("#signUpUserUsername");
const signUpUserEmail = document.querySelector("#signUpUserEmail");
const signUpUserPassword = document.querySelector("#signUpUserPassword");
const signUpUserConfirmPassword = document.querySelector("#signUpUserConfirmPassword");

if (signUpUserButton) {
    signUpUserButton.addEventListener("click", async () => {
        const response = await axios.post("http://localhost:3000/user/signup", {
            username: signUpUserUsername.value,
            email: signUpUserEmail.value,
            password: signUpUserPassword.value,
        });
        console.log(response.data.msg);
        if (response.data.msg === "done") {
            console.log('redirecting');
            window.location.href = "http://localhost:3000/user/signin"
        } else {
            console.log('something');
        }
    })
}

