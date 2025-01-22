const scroll = new LocomotiveScroll.default({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
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
