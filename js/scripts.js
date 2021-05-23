`use strict`;

const selectElems = document.querySelectorAll(`.js-select`),
      burgerBtnEl = document.querySelector(`.js-burger`),
      menuEl = document.querySelector(`.js-menu`),
      searchOpenBtnEl = document.querySelector(`.js-search-open`),
      searchFormEl = document.querySelector(`.js-search-form`),
      gallerySliderListEl = document.querySelector(`.js-gallery-slider-list`),
      galleryModalEl = document.querySelector(`.gallery-modal`),
      galleryModalImgEl = galleryModalEl.querySelector(`.gallery-modal__img`),
      galleryModalClose = document.querySelector(`.gallery-modal__close`);

// HEADER SELECTS CHOICES
selectElems.forEach((select) => {
  new Choices(select, {
    searchEnabled: false,
    itemSelectText: ``,
    shouldSort: false,
  });
});

// HEADER SELECTS SIMPLEBAR
const selectListElems = document.querySelectorAll(`.header__select-item .choices__list--dropdown`);

selectListElems.forEach((list) => {
  new SimpleBar(list);
});

// HEADER BURGER
burgerBtnEl.addEventListener(`click`, function() {
  this.classList.toggle(`header__burger_open`);
  menuEl.classList.toggle(`header__menu_open`);
  document.body.classList.toggle(`hold`);
});

// HEADER SEARCH OPEN
searchOpenBtnEl.addEventListener(`click`, function() {
  this.classList.toggle(`header__search-open_active`);
  searchFormEl.classList.toggle(`search-form_show`);
});

window.addEventListener(`click`, event => {
  if(!searchFormEl.classList.contains(`search-form_show`) ||
  event.target.closest(`.search-form_show`) ||
  event.target === searchOpenBtnEl) return;

  searchOpenBtnEl.classList.remove(`header__search-open_active`);
  searchFormEl.classList.remove(`search-form_show`);
});

// GALLERY SWIPER
const gallerySwiper = new Swiper(`.gallery-slider`, {
  observer: true,

  pagination: {
    el: '.gallery-slider__pages',
    type: `fraction`,
  },

  navigation: {
    nextEl: '.gallery-slider__btn_next',
    prevEl: '.gallery-slider__btn_prev',
  },

  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: `row`,
  spaceBetween: 6,

  breakpoints: {

    500: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerColumnFill: `row`,
      spaceBetween: 34,
    },

    1440: {
      slidesPerView: 3,
      slidesPerColumn: 2,
      slidesPerColumnFill: `row`,
      spaceBetween: 50,
    },

  }
});

// GALLERY MODAL

gallerySliderListEl.addEventListener(`click`, event => {
  event.preventDefault();
  const link = event.target.closest(`.gallery-slider__link`);
  if(!link) return;
  const src = link.getAttribute(`href`);

  galleryModalEl.classList.add(`gallery-modal_open`);
  document.body.classList.add(`hold`);
  galleryModalImgEl.src = src;

  //переводим фокус на фон модального окна, с задержкой анимации свойства visibility
  setTimeout(() => document.querySelector(`.js-bg-btn`).focus(), 160);
});

galleryModalEl.addEventListener(`click`, function(event) {
  if(!event.target.matches(`.gallery-modal__bg-btn`) && !event.target.matches(`.gallery-modal__close`)) return;

  this.classList.remove(`gallery-modal_open`);
  document.body.classList.remove(`hold`);
});

// TABS
$(`.js-catalog-tabs`).tabs({
  active: 2,
  show: {duration: 160},
  hide: {duration: 160},
});

// ACCORDION
$(`.js-accordion`).each(function() {
  $(this).accordion({
    collapsible: true,
    header: `.accordion__btn`,
    heightStyle: `content`,
  });
});
