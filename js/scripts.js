`use strict`;

const selectElems = document.querySelectorAll(`.js-select`),
      burgerBtnEl = document.querySelector(`.js-burger`),
      menuEl = document.querySelector(`.js-menu`),
      searchOpenBtnEl = document.querySelector(`.js-search-open`),
      searchFormEl = document.querySelector(`.js-search-form`);

selectElems.forEach((select) => {
  new Choices(select, {
    searchEnabled: false,
    itemSelectText: ``,
    shouldSort: false,
  });
});

const selectListElems = document.querySelectorAll(`.header__select-item .choices__list--dropdown`);

selectListElems.forEach((list) => {
  new SimpleBar(list);
});

burgerBtnEl.addEventListener(`click`, function() {
  this.classList.toggle(`header__burger_open`);
  menuEl.classList.toggle(`header__menu_open`);
  document.body.classList.toggle(`hold`);
});

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

new Swiper(`.swiper-container`, {

  pagination: {
    el: '.gallery-slider__pages',
  },

  slidesPerView: 3, // or 'auto'
  slidesPerColumn: 2,
  slidesPerGroup:3,
  spaceBetween: 5,

  navigation: {
    nextEl: '.gallery-slider__btn_next',
    prevEl: '.gallery-slider__btn_prev',
  },
});
