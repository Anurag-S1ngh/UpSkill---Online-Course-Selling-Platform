const signUpAdminButton = document.querySelector('#signUpAdmin');

const signUpAdminUsername = document.querySelector("#signUpAdminUsername");
const signUpAdminEmail = document.querySelector("#signUpAdminEmail");
const signUpAdminPassword = document.querySelector("#signUpAdminPassword");
const signUpAdminConfirmPassword = document.querySelector("#signUpAdminConfirmPassword");

signUpAdminButton.addEventListener("click", async () => {
    if (signUpAdminConfirmPassword.value.trim() === signUpAdminPassword.value.trim()) {
        const response = await axios.post("http://localhost:3000/admin/signup", {
            username: signUpAdminUsername.value,
            email: signUpAdminEmail.value,
            password: signUpAdminPassword.value,
        });
        if (response.data.msg === "done") {
            console.log('redirecting');
            window.location.href = "http://localhost:3000/user/signin";
        } 
        else if (response.data.error.includes('duplicate key error collection') ) {
            alert("u have already sign up");
        }else {
            console.log('something');
        }
    } else {
        alert("Password do not match");
        return;
    }
})