'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const s1initialcoords = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const imgtargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;
const maxCountSlider = slides.length;

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => {});
// };

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const stickyNav = entries => {
  const [entry] = entries;

  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const nextSlide = () => {
  currentSlide === maxCountSlider - 1 ? (currentSlide = 0) : currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = () => {
  currentSlide === 0 ? (currentSlide = maxCountSlider) : currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = () => {
  createDots();
  goToSlide(0);
  activateDot(0);
};

init();

const revealsection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const revealImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const opacityChange = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

btnsOpenModal.forEach(e => e.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', opacityChange.bind(0.5));

nav.addEventListener('mouseout', opacityChange.bind(1));

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// window.addEventListener('scroll', () => {
//   window.scrollY > s1initialcoords.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});

headerObserver.observe(header);

const sectionObserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgtargets.forEach(img => imgObserver.observe(img));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();

  if (e.key === 'ArrowRight') nextSlide();
});
