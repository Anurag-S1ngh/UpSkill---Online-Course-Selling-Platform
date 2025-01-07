const signUpUserButton = document.querySelector('#signUpUser');

const signUpUserUsername = document.querySelector("#signUpUserUsername");
const signUpUserEmail = document.querySelector("#signUpUserEmail");
const signUpUserPassword = document.querySelector("#signUpUserPassword");
const signUpUserConfirmPassword = document.querySelector("#signUpUserConfirmPassword");

signUpUserButton.addEventListener("click", async () => {
    if (signUpUserConfirmPassword !== signUpUserPassword) {
        const response = await axios.post("http://localhost:3000/user/signup", {
            username: signUpUserUsername.value,
            email: signUpUserEmail.value,
            password: signUpUserPassword.value,
        });
        console.log(response.data.msg);
        if (response.data.msg === "done") {
            console.log('redirecting');
            window.location.href = 'http://localhost:3000/user/signin';
        }
        else if (response.data.error.includes('duplicate key error collection')) {
            alert("u have already signed up");
        }
    } else {
        alert("Password do not match");
    }
})
