`use strict`;

const selectEl = document.querySelector(`.js-select`);
const burgerBtnEl = document.querySelector(`.js-burger`);
const menuEl = document.querySelector(`.js-menu`);
const directionsListEl = document.querySelector(`.js-directions-list`);
const directionsAuthorListElems = document.querySelectorAll(`.directions__author-list`);
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
const feedbackFormEl = document.querySelector(`.js-feedback-form`);
const feedbackInputTelEl = document.querySelector(`.js-feedback-tel`);
const inputmask = new Inputmask(`+7(999) 999-99-99`, { autoUnmask: true });


// DROPDOWNS
directionsListEl.addEventListener(`click`, function (event) {
  if (!event.target.classList.contains(`directions__link`)) return;

  event.preventDefault();
  const currentLinkEl = event.target;
  const linkElems = this.querySelectorAll(`.directions__link`);
  const targetItemEl = event.target.closest(`.directions__item`);
  const itemElems = this.querySelectorAll(`.directions__item`);

  currentLinkEl.ariaExpanded = (currentLinkEl.ariaExpanded === `true`) ? `false` : `true`;

  linkElems.forEach(link => {
    if (!(link === currentLinkEl)) {
      link.ariaExpanded = `false`;
    }
  });

  itemElems.forEach(item => {
    if (item === targetItemEl && !item.classList.contains(`directions__item_active`)) {
      item.classList.add(`directions__item_active`);
      return;
    }

    item.classList.remove(`directions__item_active`);
  });
});

window.addEventListener(`click`, (event) => {
  if (!event.target.closest(`.directions__item`)) {
    document.querySelectorAll(`.directions__item`).forEach(item => {
      item.classList.remove(`directions__item_active`);
    });

    document.querySelectorAll(`.directions__link`).forEach(link => {
      link.ariaExpanded = `false`;
    });
  }
});

// HEADER SELECTS SIMPLEBAR
directionsAuthorListElems.forEach(list => {
  new SimpleBar(list, {
    autoHide: false,
    scrollbarMaxSize: 28,
  });
});

// HEADER BURGER

function toggleNavMenu() {
  burgerBtnEl.classList.contains(`header__burger_open`) ?
    burgerBtnEl.ariaLabel = `Открыть меню` : burgerBtnEl.ariaLabel = `Закрыть меню`;
  burgerBtnEl.classList.toggle(`header__burger_open`);
  menuEl.classList.toggle(`header__menu_open`);
}

burgerBtnEl.addEventListener(`click`, toggleNavMenu);

//выключаем меню при клике по ссылке
menuEl.addEventListener(`click`, event => {
  if (!event.target.classList.contains(`anchor`) || !menuEl.classList.contains(`header__menu_open`)) return;
  toggleNavMenu();
});

// HEADER SEARCH OPEN
searchOpenBtnEl.addEventListener(`click`, function () {
  this.classList.contains(`header__search-open_active`) ?
    this.ariaLabel = `Открыть форму поиска` : this.ariaLabel = `Закрыть форму поиска`;
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

  searchOpenBtnEl.ariaLabel = `Открыть форму поиска`;
  searchOpenBtnEl.classList.remove(`header__search-open_active`);
  searchFormEl.classList.remove(`search-form_show`);
});

// GALLERY SELECT CHOICES
new Choices(selectEl, {
  searchEnabled: false,
  itemSelectText: ``,
  shouldSort: false,
});

// GALLERY SWIPER
const gallerySwiper = new Swiper(`.gallery-slider__swiper`, {
  pagination: {
    el: `.gallery-slider__pages`,
    type: `fraction`,
  },

  navigation: {
    nextEl: `.gallery-slider__btn_next`,
    prevEl: `.gallery-slider__btn_prev`,
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  grid: {
    rows: 1,
  },

  spaceBetween: 6,

  breakpoints: {
    501: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 2,
      },
      spaceBetween: 34,
    },

    1201: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 2,
      },
      spaceBetween: 50,
    },
  },

  a11y: {
    prevSlideMessage: `Предыдущий слайд`,
    nextSlideMessage: `Следующий слайд`,
  },
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

  // переводим фокус на кнопку "закрыть" модального окна с задержкой анимации visibility
  setTimeout(() => galleryModalClose.focus(), 160);
});

galleryModalEl.addEventListener(`click`, function (event) {
  if (
    !event.target.classList.contains(`gallery-modal`) &&
    !event.target.classList.contains(`gallery-modal__close`)
  )
    return;

  this.classList.remove(`gallery-modal_open`);
  document.body.classList.remove(`hold`);
});

// PAINTER-LINK CLICK

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

  if (cardId.startsWith(`#unknown-painter`)) {
    targetCard = parentTabEl.querySelector(`.painter-info_empty`);
    targetCard.querySelector(`.js-painter-name`).textContent = painterName;
  } else targetCard = parentTabEl.querySelector(cardId);

  cards.forEach(card => {
    (card === targetCard) ? card.classList.add(`painter-info_active`) : card.classList.remove(`painter-info_active`);
  });

  links.forEach(link => {
    (link === linkEl) ? link.classList.add(`accordion__painter-link_active`) : link.classList.remove(`accordion__painter-link_active`);
  });
});

// Обработчик кнопки "Все события"
expandBtnEl.addEventListener(`click`, function () {
  eventsListEl.classList.add(`events__list_show`);
  this.hidden = true;
});

// EVENTS SWIPER
const eventsSwiper = new Swiper(`.events-slider`, {
  pagination: {
    el: `.events__slider-pagination`,
    clickable: true,
  },

  slidesPerView: 1,
  spaceBetween: 6,

  breakpoints: {
    501: {
      enabled: false,
      spaceBetween: ``,
    }
  },

  a11y: {
    paginationBulletMessage: `Перейти к слайду {{index}}`,
  },
});

// EDITIONS FILTER
filterHeaderBtnEl.addEventListener(`click`, function () {
  filterCategoriesEl.classList.contains(`editions-filter__fieldset_show`) ?
    this.ariaLabel = `Раскрыть список категорий` : this.ariaLabel = `Свернуть список категорий`;

  this.ariaExpanded = (this.ariaExpanded === `true`) ? `false` : `true`;

  filterCategoriesEl.classList.toggle(`editions-filter__fieldset_show`);
});

filterCategoriesEl.addEventListener(`change`, (event) => {
  if (!event.target.classList.contains(`editions-filter__checkbox`)) return;

  event.target.checked ?
    event.target.closest(`.editions-filter__item`).classList.add(`editions-filter__item_active`) :
    event.target.closest(`.editions-filter__item`).classList.remove(`editions-filter__item_active`);
});

// EDITIONS SWIPER
const editionsSwiperProps = {
  pagination: {
    el: `.editions-slider__pages`,
    type: `fraction`,
  },

  navigation: {
    nextEl: `.editions-slider__btn_next`,
    prevEl: `.editions-slider__btn_prev`,
  },

  breakpoints: {
    0: {
      enabled: false,
      spaceBetween: ``,
    },

    501: {
      enabled: true,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 48,
    },

    1201: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  },

  a11y: {
    prevSlideMessage: `Предыдущий слайд`,
    nextSlideMessage: `Следующий слайд`,
  },
};

const editionsSwiper = new Swiper(`.editions-slider__swiper`, editionsSwiperProps);

// PROJECTS TOOLTIPS
const tooltipElems = document.querySelectorAll(`[data-tooltip]`);
for (const tooltip of tooltipElems) {
  const message = tooltip.dataset.tooltip;
  tippy(tooltip, {
    content: message,
  });
}

// PROJECTS SWIPER

const projectsSwiper = new Swiper(`.projects-slider__swiper`, {
  navigation: {
    nextEl: `.projects-slider__btn_next`,
    prevEl: `.projects-slider__btn_prev`,
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 6,

  breakpoints: {
    501: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },

    1201: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  },

  a11y: {
    prevSlideMessage: `Предыдущий слайд`,
    nextSlideMessage: `Следующий слайд`,
  },
});

// JUSTVALIDATE & MASK
inputmask.mask(feedbackInputTelEl);

const feedbackValidation = new JustValidate(`.js-feedback-form`);

feedbackValidation.addField(`#feedback-name`, [
  {
    rule: `required`,
    errorMessage: `Как вас зовут?`,
  },
  {
    rule: `customRegexp`,
    value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    errorMessage: `Числа и спецсимволы недопустимы`,
  },
]);

feedbackValidation.addField(`#feedback-phone`, [
  {
    rule: `required`,
    errorMessage: `Укажите ваш телефон`,
  },
]);

// CONTACTS MAP
ymaps.ready(init);

function init() {
  const contactsMap = new ymaps.Map(`contacts-map`, {
    center: [55.758468, 37.601088],
    zoom: 14.25,
    controls: [],
  });

  const placemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: `default#image`,
    iconImageHref: `img/placemark.svg`,
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -10],
  });

  contactsMap.geoObjects.add(placemark);

  // Создадим пользовательский макет ползунка масштаба.
  const ZoomLayout = ymaps.templateLayoutFactory.createClass(
    `<div class='contacts-map__zoom-btns'><button id='zoom-in' class='contacts-map__zoom-btn' title='Приблизить'>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.992c0-.537.448-.992 1-.992.556 0 1 .444 1 .992V11h5.008c.537 0 .992.448.992 1 0 .556-.444 1-.992
          1H13v5.008c0 .537-.448.992-1 .992-.556 0-1-.444-1-.992V13H5.992C5.455 13 5 12.552 5 12c0-.556.444-1 .992-1H11V5.992z" fill="currentColor"></path>
        </svg>
      </button><button id='zoom-out' class='contacts-map__zoom-btn' title='Отдалить'>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" fill="currentColor"></path>
      </svg>
      </button></div>`, {

    // Переопределяем методы макета, чтобы выполнять дополнительные действия
    // при построении и очистке макета.
    build: function () {
      // Вызываем родительский метод build.
      ZoomLayout.superclass.build.call(this);

      // Привязываем функции-обработчики к контексту и сохраняем ссылки
      // на них, чтобы потом отписаться от событий.
      this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
      this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

      // Начинаем слушать клики на кнопках макета.
      $(`#zoom-in`).bind(`click`, this.zoomInCallback);
      $(`#zoom-out`).bind(`click`, this.zoomOutCallback);
    },

    clear: function () {
      // Снимаем обработчики кликов.
      $(`#zoom-in`).unbind(`click`, this.zoomInCallback);
      $(`#zoom-out`).unbind(`click`, this.zoomOutCallback);

      // Вызываем родительский метод clear.
      ZoomLayout.superclass.clear.call(this);
    },

    zoomIn: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
    },

    zoomOut: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
    }
  }),
    zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });

  contactsMap.controls.add(zoomControl, {
    float: `none`,
    position: {
      top: `260px`,
      right: `10px`,
    },
  });

  contactsMap.controls.add(`geolocationControl`, {
    float: `right`,
  });
}

// jQuery

$(`document`).ready(function () {
  // плавные переходы по якорям
  function onScrollSmoothLinkClick(event) {
    event.preventDefault();

    const href = $(this).attr(`href`);
    const offsetTop = $(href).offset().top;

    $(`html, body`).animate({
      scrollTop: offsetTop,
    }, 700);
  }

  // все переходы
  $(`.anchor`).on(`click`, onScrollSmoothLinkClick);

  // переходы на мобильной версии
  $(`.accordion__painter-link`).on(`click`, function (event) {
    /**
      *запускаем функцию плавного скролла в текущем контексте
      *через таймер с нулевой задержкой, чтобы элемент сначала принял правильную позицию
      */
    if ($(window).width() <= 1000) setTimeout(() => onScrollSmoothLinkClick.call(this, event));
  });

  // TABS
  $(`.js-catalog-tabs`).tabs({
    active: 2,
    show: { duration: 160 },
    hide: { duration: 160 },
  });

  // ACCORDION
  $(`.js-accordion`).each(function () {
    $(this).accordion({
      collapsible: true,
      header: `.accordion__btn`,
      heightStyle: `content`,
    });
  });
});
