const usernameInput = document.querySelector('.username input');
const emailInput = document.querySelector('.email input');
const passwordInput = document.querySelector('.password input');
const confirmPasswordInput = document.querySelector('.confirm_password input');

usernameInput.addEventListener("focus", () => {
    gsap.to(".username .placeholder p", {
        duration: 0.6,
        opacity: 1,
        color: "#4d5bfc",
        fontSize: "0.8rem",
        left: "0.75rem",
        top: "-0.6rem",
        ease: "elastic.out(1,1)",
    });
});

usernameInput.addEventListener("blur", () => {
    if (usernameInput.value.trim() == '') {
        gsap.to(".username .placeholder p", {
            duration: 0.6,
            top: "0.7rem",
            left: "1rem",
            opacity: 0.3,
            fontSize: "1rem",
            color: "#040105",
            ease: "elastic.out(1,1)",
        });
    }
});

emailInput.addEventListener("focus", () => {
    gsap.to(".email .placeholder p", {
        duration: 0.6,
        opacity: 1,
        color: "#4d5bfc",
        fontSize: "0.8rem",
        left: "0.75rem",
        top: "-0.6rem",
        ease: "elastic.out(1,1)",
    });
});

emailInput.addEventListener("blur", () => {
    if (emailInput.value.trim() == '') {
        gsap.to(".email .placeholder p", {
            duration: 0.6,
            top: "0.7rem",
            left: "1rem",
            opacity: 0.3,
            fontSize: "1rem",
            color: "#040105",
            ease: "elastic.out(1,1)",
        });
    }
});

passwordInput.addEventListener("focus", () => {
    gsap.to(".password .placeholder p", {
        duration: 0.6,
        opacity: 1,
        color: "#4d5bfc",
        fontSize: "0.8rem",
        left: "0.75rem",
        top: "-0.6rem",
        ease: "elastic.out(1,1)",
    });
});

passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.trim() == '') {
        gsap.to(".password .placeholder p", {
            duration: 0.6,
            top: "0.7rem",
            left: "1rem",
            opacity: 0.3,
            fontSize: "1rem",
            color: "#040105",
            ease: "elastic.out(1,1)",
        });
    }
});

confirmPasswordInput.addEventListener("focus", () => {
    gsap.to(".confirm_password .placeholder p", {
        duration: 0.6,
        opacity: 1,
        color: "#4d5bfc",
        fontSize: "0.8rem",
        left: "0.75rem",
        top: "-0.6rem",
        ease: "elastic.out(1,1)",
    });
});

confirmPasswordInput.addEventListener("blur", () => {
    if (confirmPasswordInput.value.trim() == '') {
        gsap.to(".confirm_password .placeholder p", {
            duration: 0.6,
            top: "0.7rem",
            left: "1rem",
            opacity: 0.3,
            fontSize: "1rem",
            color: "#040105",
            ease: "elastic.out(1,1)",
        });
    }
});

document.querySelector('.signUpButton').addEventListener('mouseenter', () => {
    gsap.to('.first_arrow', {
        duration: 0.35,
        ease: "power2.in",
        transform: "translate(100%, -100%)"
    })
    gsap.to('.second_arrow', {
        delay: 0.2,
        duration: 0.35,
        ease: "power2.out",
        transform: "translate(0%, -00%)"
    })
})

document.querySelector('.signUpButton').addEventListener('mouseleave', () => {
    gsap.to('.second_arrow', {
        transform: "translate(-100%, 100%)",
        duration: 0.35,
        ease: "power2.in",
    })

    gsap.to('.first_arrow', {
        delay: 0.2,
        duration: 0.35,
        ease: "power2.out",
        transform: "translate(00%, 00%)",
    })
})