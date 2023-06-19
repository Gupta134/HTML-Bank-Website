"use strict";

const modal = document.querySelector(".modal");
const heading = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const footerLogo = document.querySelector(".footer__logo");



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};



btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});



btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

footerLogo.addEventListener("click", function () {
  heading.scrollIntoView({ behavior: "smooth" });
});



document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const sc = e.target.getAttribute("href");
    document.querySelector(sc).scrollIntoView({ behavior: "smooth" });
  }
});



tabsContainer.addEventListener("click", function (e) {
  const clicking = e.target.closest(".operations__tab");

  
  if (!clicking) return;

  
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  
  clicking.classList.add("operations__tab--active");

  
  document
    .querySelector(`.operations__content--${clicking.dataset.tab}`)
    .classList.add("operations__content--active");
});


const hoverHandler = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const links = e.target;
    const sibling = links.closest(".nav").querySelectorAll(".nav__link");
    const logo = links.closest(".nav").querySelector("img");

    sibling.forEach((c) => {
      if (c !== links) c.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", hoverHandler.bind(0.5));
nav.addEventListener("mouseout", hoverHandler.bind(1));



const header = document.querySelector(".header");
const headHeightCalc = nav.getBoundingClientRect().height;

const navSticky = function (e) {
  const [entry] = e;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headObserver = new IntersectionObserver(navSticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${headHeightCalc}px`,
});

headObserver.observe(header);


const allSections = document.querySelectorAll("section");

const revealOnScroll = function (enter, observer) {
  const [en] = enter;

  if (!en.isIntersecting) return;

  en.target.classList.remove("section--hidden");
  observer.unobserver(en.target);
};

const sectionObserver = new IntersectionObserver(revealOnScroll, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});



const loadingImg = document.querySelectorAll("img[data-src]");
const loadImg = function (entry, observe) {
  const [en] = entry;

  if (!en.isIntersecting) return;

 
  en.target.src = en.target.dataset.src;

  en.target.addEventListener("load", function () {
    en.target.classList.remove("lazy-img");
  });

  observe.unobserver(en.target);
};

const observerImg = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

loadingImg.forEach((image) => observerImg.observe(image));



const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();