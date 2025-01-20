const scroll = new LocomotiveScroll.default({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 1.2,
  friction: 1,
});

document.querySelector(".add").addEventListener("click", () => {
  const navAnimationTimeline = gsap.timeline();
  navAnimationTimeline.to(".pre_loader_1", {
    left: "-4%",
    duration: 0.45,
    ease: "expoScale(10,2.5,power2.out)",
  });
  navAnimationTimeline.to(
    ".pre_loader_2",
    {
      left: "-4%",
      duration: 0.55,
      ease: "expoScale(10,2.5,power2.out)",
    },
    "-=0.1",
  );
  navAnimationTimeline.to(
    ".nav_container",
    {
      left: "-5%",
      duration: 1.4,
      ease: "power4.out",
    },
    "-=0.2",
  );
});

document.querySelector(".close").addEventListener("click", () => {
  const navAnimationTimeline = gsap.timeline();
  navAnimationTimeline.to(".pre_loader_2", {
    left: "110%",
    duration: 0,
    ease: "power2.out",
  });
  navAnimationTimeline.to(".pre_loader_1", {
    left: "110%",
    duration: 0,
    ease: "power2.out",
  });
  navAnimationTimeline.to(".nav_container", {
    left: "110%",
    duration: 1.2,
    ease: "power4.in",
  });
});

document.querySelector(".explore_button").addEventListener("mouseenter", () => {
  gsap.to(".first_arrow", {
    ease: "power2.in",
    transform: "translate(100%, -100%)",
  });
  gsap.to(".second_arrow", {
    delay: 0.25,
    ease: "power2.out",
    transform: "translate(0%, -00%)",
  });
});

document.querySelector(".explore_button").addEventListener("mouseleave", () => {
  gsap.to(".second_arrow", {
    transform: "translate(-100%, 100%)",
    ease: "power2.in",
  });

  gsap.to(".first_arrow", {
    delay: 0.25,
    ease: "power2.out",
    transform: "translate(00%, 00%)",
  });
});
