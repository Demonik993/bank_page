'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

//FUNCTIONS
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}, 0.5)`;

const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//EVENTS
btnsOpenModal.forEach(e => e.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelectorAll('.nav__link').forEach(e =>
  e.addEventListener('click', function (e) {
    e.preventDefault();
    //add smooth scooling to element
    // const section = document.querySelector(this.getAttribute('href'));
    // section.scrollIntoView({ behavior: 'smooth' });
    // this.style.backgroundColor = randomColor();
    // e.stopPropagation();
  })
);
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // this.style.backgroundColor = randomColor();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }

  // e.stopPropagation();
});
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coord = section1.getBoundingClientRect();
//   // console.log(s1coord);
//   // window.scrollTo(s1coord.x + window.scrollX, s1coord.y + window.scrollY);
//   window.scrollTo({
//     left: s1coord.x + window.scrollX,
//     top: s1coord.y + window.scrollY,
//     behavior: 'smooth',
//   });

//   // console.log(e.target.getBoundingClientRect());
//   // console.log('current scrool: ' + window.scrollX, scrollY);
//   // console.log(document.documentElement.clientHeight);
//   // console.log(document.documentElement.clientWidth);
// });

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Operations Tabs
// document.querySelectorAll('.operations__tab').forEach(e => {
//   e.addEventListener('click', function () {
//     document
//       .querySelector('.operations__tab--active')
//       .classList.remove('operations__tab--active');
//     e.classList.add('operations__tab--active');
//     const tabNo = e.getAttribute('data-tab');
//     document
//       .querySelector('.operations__content--active')
//       .classList.remove('operations__content--active');
//     document
//       .querySelector(`.operations__content--${tabNo}`)
//       .classList.add('operations__content--active');
//   });
// });
const tabBtns = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__content');
//EVENT DELEGATION!
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // guard clause
  if (!clicked) return;
  tabBtns.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabs.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// ////////////////
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav // .addEventListener('mouseover', e => handleHover(e, 0.5));
  .addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallBack = function (entries, observer) {
//   entries.forEach(e => console.log(e));
// };

// const obsOps = {
//   root: null,
//   treshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOps);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

const sections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const lazyImgs = document.querySelectorAll('img[data-src]');
const showImgs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // const imgSrc = entry.target.dataset.src;
  // console.log(entry);
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(showImgs, {
  root: null,
  threshold: 1,
});
lazyImgs.forEach(img => imgObserver.observe(img));

//slider
const sliderFunc = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dots = document.querySelector('.dots');

  let curSlide = 0;
  // slider.style.transform = 'scale(0.3) translate(-500px)';
  // slider.style.overflow = 'visible';
  const createDots = function () {
    slides.forEach((_, i) =>
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));
    document
      .querySelector(`[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = slide =>
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${(i - slide) * 100}%)`)
    );
  const nextSlide = function () {
    if (curSlide === slides.length - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = slides.length - 1;
    else curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;

      goToSlide(slide);
      activeDot(slide);
      curSlide = slide;
    }
  });
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  const init = () => {
    createDots();
    activeDot(curSlide);
    goToSlide(0);
  };
  init();
};
sliderFunc();
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM and HTML loaded');
  console.log(e);
});
window.addEventListener('load', function (e) {
  console.log('All imgs and sources are loaded');
  console.log(e);
});
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
// .addEventListener('mouseout', e => handleHover(e, 1));
// const listsQuery = document.querySelectorAll('li');
// const listsGetElem = document.getElementsByTagName('li');
// console.log(listsQuery);
// console.log(listsGetElem);
// const header = document.querySelector('header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookies to improve functionality and analytics purposes.';
// message.innerHTML = `We use cookies to improve functionality and analytics purposes.<button class="btn btn--close--cookie">Got it </button>`;
// header.prepend(message);
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', () => message.remove());
// // document.documentElement.style.setProperty('--color-primary', 'orangered');
// const logo = document.querySelector('.nav__logo');
// // console.log(logo.alt);
// // console.log(logo.src); //127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
// // console.log(logo.getAttribute('src')); //img/logo.png
// // console.log('classList: ' + btnsOpenModal.classList); //undefined
// // console.log(logo.getAttribute('class'));
// logo.classList.add('abc', 'xyz'); // nav__logo abc xyz
// console.log(logo.classList.value);
// logo.classList.remove('abc'); //nav__logo xyz
// console.log(logo.classList.value);
// logo.classList.toggle('abc'); //nav__logo xyz abc
// console.log(logo.classList.value);
// logo.classList.toggle('xyz'); // nav__logo abc
// console.log(logo.classList.contains('abc')); // true
// console.log(logo.classList.value);
// const listEl = document.querySelectorAll('li');
// const h1 = document.querySelector('h1');
// h1.forEach(e =>
//   e.addEventListener('mouseenter', function () {
//     console.log('This is h1 element');
//   })
// );
// h1.forEach(
//   e =>
//     (e.onmouseenter = function (e) {
//       console.log('This is h1 element');
//     })
// );
// const showList = function (e) {
//   console.log(e.target.firstElementChild.textContent);
//   e.target.removeEventListener('mouseenter', showList);
// };
// listEl.forEach(e => e.addEventListener('mouseenter', showList));
// const showHeading = function (e) {
//   alert(e.target.textContent);
// };
// h1.addEventListener('mouseenter', showHeading);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', showHeading);
// }, 2000);
// const h1 = document.querySelector('h1');
// // console.log(h1.parentElement);
// // console.log((h1.closest('header').style.backgroundColor = 'blue'));
// // console.log(h1.closest('h4'));
// console.log(h1.previousElementSibling);
// console.log(h1.nextSibling);
// NOTE : FUNCTION FOR RÓŻA
// const howManyWeeks = function (date1, date2) {
//   date1 = new Date(2024, 0, 6);
//   date2 = new Date(2023, 8, 23);

//   const seconds = Math.floor((date1 - date2) / 1000);
//   const minutes = Math.floor((date1 - date2) / (1000 * 60));
//   const hours = Math.floor((date1 - date2) / (1000 * 60 * 60));
//   const days = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
//   const weeks = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24 * 7));
//   const years = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24 * 365));
//   const months =
//     date1.getDate() < date2.getDate()
//       ? Math.floor(date1.getMonth() - date2.getMonth() + 12) - 1
//       : Math.floor(date1.getMonth() - date2.getMonth() + 12);
//   console.log(seconds + 's');
//   console.log(minutes + 'min');
//   console.log(hours + 'h');
//   console.log(days + ' days');
//   console.log(weeks + ' weeks');
//   console.log(months + ' months');
//   console.log(years + ' years');
// };
// howManyWeeks();
