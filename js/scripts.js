`use strict`;

const NO_PAINTER_INFO_ID = `#unknown-painter`;
const selectElems = document.querySelectorAll(`.js-select`);
const burgerBtnEl = document.querySelector(`.js-burger`);
const menuEl = document.querySelector(`.js-menu`);
const searchOpenBtnEl = document.querySelector(`.js-search-open`);
const searchFormEl = document.querySelector(`.js-search-form`);
const gallerySliderListEl = document.querySelector(`.js-gallery-slider-list`);
const galleryModalEl = document.querySelector(`.js-gallery-modal`);
const galleryModalImgEl = galleryModalEl.querySelector(`.js-gallery-modal-img`);
const galleryModalClose = document.querySelector(`.js-gallery-modal-close`);
const catalogTabsEl = document.querySelector(`.js-catalog-tabs`);
const expandBtnEl = document.querySelector(`.js-expand-btn`);
const eventsListEl = document.querySelector(`.js-events-list`);
const filterHeaderBtnEl = document.querySelector(`.js-filter-header-btn`);
const filterCategoriesEl = document.querySelector(`.js-filter-categories`);

// HEADER SELECTS CHOICES
selectElems.forEach(select => {
  new Choices(select, {
    searchEnabled: false,
    itemSelectText: ``,
    shouldSort: false
  });
});

// HEADER SELECTS SIMPLEBAR
const selectListElems = document.querySelectorAll(
  `.header__select-item .choices__list--dropdown`
);

selectListElems.forEach(list => {
  new SimpleBar(list);
});

function toggleNavMenu() {
  burgerBtnEl.classList.toggle(`header__burger_open`);
  menuEl.classList.toggle(`header__menu_open`);
  document.body.classList.toggle(`hold`);
}

// HEADER BURGER
burgerBtnEl.addEventListener(`click`, toggleNavMenu);

//выключаем меню при клике по ссылке
menuEl.addEventListener(`click`, event => {
  if (!event.target.classList.contains(`anchor`)) return;

  toggleNavMenu();
});

// HEADER SEARCH OPEN
searchOpenBtnEl.addEventListener(`click`, function () {
  this.classList.toggle(`header__search-open_active`);
  searchFormEl.classList.toggle(`search-form_show`);
});

window.addEventListener(`click`, event => {
  if (
    !searchFormEl.classList.contains(`search-form_show`) ||
    event.target.closest(`.search-form_show`) ||
    event.target === searchOpenBtnEl
  )
    return;

  searchOpenBtnEl.classList.remove(`header__search-open_active`);
  searchFormEl.classList.remove(`search-form_show`);
});

// GALLERY SWIPER
const gallerySwiper = new Swiper(`.gallery-slider`, {

  pagination: {
    el: '.gallery-slider__pages',
    type: `fraction`
  },

  navigation: {
    nextEl: '.gallery-slider__btn_next',
    prevEl: '.gallery-slider__btn_prev'
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  grid: {
    rows: 1
  },
  spaceBetween: 6,

  breakpoints: {
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 34
    },

    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 50
    }
  }
});

// GALLERY MODAL

gallerySliderListEl.addEventListener(`click`, event => {
  event.preventDefault();
  const link = event.target.closest(`.gallery-slider__link`);
  if (!link) return;
  const src = link.getAttribute(`href`);

  galleryModalEl.classList.add(`gallery-modal_open`);
  document.body.classList.add(`hold`);
  galleryModalImgEl.src = src;

  //переводим фокус на фон модального окна, с задержкой анимации свойства visibility
  setTimeout(() => document.querySelector(`.js-bg-btn`).focus(), 160);
});

galleryModalEl.addEventListener(`click`, function (event) {
  if (
    !event.target.matches(`.gallery-modal__bg-btn`) &&
    !event.target.matches(`.gallery-modal__close`)
  )
    return;

  this.classList.remove(`gallery-modal_open`);
  document.body.classList.remove(`hold`);
});

// PAINTER-LINK-CLICK
catalogTabsEl.addEventListener(`click`, function (event) {
  if (!event.target.classList.contains(`accordion__painter-link`)) return;
  event.preventDefault();

  const linkEl = event.target;
  const links = linkEl.closest(`.accordion__painters-list`).querySelectorAll(`.accordion__painter-link`);
  const cardId = linkEl.getAttribute(`href`);
  const painterName = linkEl.textContent.replace(`,`, ``);
  const parentTabEl = linkEl.closest(`.catalog-tabs__tab`);
  const cards = parentTabEl.querySelectorAll(`.painter-info`);
  let targetCard;

  if (cardId === NO_PAINTER_INFO_ID) {
    targetCard = parentTabEl.querySelector(`.painter-info_empty`);
    targetCard.querySelector(`.js-painter-name`).textContent = painterName;
  } else targetCard = parentTabEl.querySelector(cardId);

  cards.forEach(card => {
    (card === targetCard) ? card.classList.add(`painter-info_active`) : card.classList.remove(`painter-info_active`);
  });

  links.forEach(link => {
    (link === linkEl) ? link.classList.add(`accordion__painter-link_active`) : link.classList.remove(`accordion__painter-link_active`);
  })
});

//Обработчик кнопки "Все события"
expandBtnEl.addEventListener(`click`, function () {
  eventsListEl.classList.add(`events__list_show`);
  this.hidden = true;
});

// EVENTS SWIPER
const eventsSwiper = new Swiper(`.events-slider`, {
  pagination: {
    el: '.events-slider__pagination'
  },

  slidesPerView: 1,
  spaceBetween: 6,

  breakpoints: {
    500: {
      enabled: false,
      spaceBetween: ``,
    }
  }
});

// EDITIONS FILTER
filterHeaderBtnEl.addEventListener(`click`, function () {
  filterCategoriesEl.classList.toggle(`editions-filter__fieldset_show`);
});

//EDITIONS SWIPER
const editionsSwiperProps = {

  pagination: {
    el: '.editions-slider__pages',
    type: `fraction`,
  },

  navigation: {
    nextEl: '.editions-slider__btn_next',
    prevEl: '.editions-slider__btn_prev',
  },

  breakpoints: {
    0: {
      enabled: false,
      spaceBetween: ``,
    },

    500: {

      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },

    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  }
};
const editionsSwiper = new Swiper(`.editions-slider`, editionsSwiperProps);

window.addEventListener(`resize`, () => {
  const clientWidth = document.documentElement.clientWidth;
  console.log(clientWidth);
  (clientWidth <= 500) ?
      editionsSwiper.destroy(true, true) :
      new Swiper(`.editions-slider`, editionsSwiperProps);
});

//PROJECTS SWIPER

const projectsSwiper = new Swiper(`.projects-slider`, {
  navigation: {
    nextEl: '.projects-slider__btn_next',
    prevEl: '.projects-slider__btn_prev'
  },

  slidesPerView: 1,
  spaceBetween: 6
});

//jQuery

$(`document`).ready(function () {
  //плавные пепеходы по якорям
  $(`.anchor`).on(`click`, function (event) {
    event.preventDefault();

    const href = $(this).attr(`href`);
    const offsetTop = $(href).offset().top;

    $(`html, body`).animate({
      scrollTop: offsetTop,
    }, 700);
  });
  // TABS
  $(`.js-catalog-tabs`).tabs({
    active: 2,
    show: { duration: 160 },
    hide: { duration: 160 }
  });

  // ACCORDION
  $(`.js-accordion`).each(function () {
    $(this).accordion({
      collapsible: true,
      header: `.accordion__btn`,
      heightStyle: `content`
    });
  });
});
