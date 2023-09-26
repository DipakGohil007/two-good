// locomotive-ScrollTrigger
let locomotiveScrollTrigger = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};

locomotiveScrollTrigger();

// logo-animation
gsap.to(".logo img", {
  transform: "translateY(-100%)",
  scrollTrigger: {
    trigger: ".page1",
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

// nav-links-animation
gsap.to(".nav-links .links", {
  transform: "translateY(-100%)",
  opacity: 0,
  scale: 0,
  scrollTrigger: {
    trigger: ".page1",
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

// Page-title Animation

gsap.from(".page1 h1", {
  y: 100,
  opacity: 0,
  delay: 0.5,
  duration: 0.9,
  stagger: 0.2,
});

// Video-container Animation
let videocon = document.querySelector(".video-container");
let playbtn = document.querySelector(".play");

videocon.addEventListener("mouseenter", () => {
  gsap.to(playbtn, {
    scale: 1,
    opacity: 1,
  });
});

videocon.addEventListener("mouseleave", () => {
  gsap.to(playbtn, {
    scale: 0,
    opacity: 0,
  });
});

videocon.addEventListener("mousemove", (event) => {
  const containerRect = videocon.getBoundingClientRect();
  const playbtnWidth = playbtn.offsetWidth;
  const playbtnHeight = playbtn.offsetHeight;
  const offsetX = event.clientX - containerRect.left - playbtnWidth / 2;
  const offsetY = event.clientY - containerRect.top - playbtnHeight / 2;

  gsap.to(playbtn, {
    x: offsetX,
    y: offsetY,
  });
});

gsap.from(".page1 .video-container", {
  scale: 0.9,
  opacity: 0,
  delay: 1.3,
  duration: 0.3,
});

gsap.from(".page2 .elem", {
  scale: 0.9,
  opacity: 0,
  delay: 1.3,
  duration: 0.3,
});

//Cursor-Animation

let cursorAnimation = () => {
  document.addEventListener("mousemove", (dets) => {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  let products = document.querySelectorAll(".product");

  products.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to(".cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(".cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
};

cursorAnimation();
