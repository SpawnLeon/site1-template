'use strict';

import '../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css';

import Vue from 'vue';
window.Vue = Vue;

import '../scss/styles.scss';

import 'jquery';
import '@fancyapps/fancybox';

import Swiper from 'swiper';

const responseMenu = (menuSelector) => {
  document.querySelectorAll(menuSelector).forEach((menu) => {
    const menuChildren = menu.children;
    const hiddenMenuItems = document.createElement('LI');
    hiddenMenuItems.classList.add('hidden-menu-items');
    hiddenMenuItems.innerHTML =
      '<button class="hidden-menu-items__btn btn--clear"><span></span><span></span><span></span></button>';
    const hiddenMenuItemsList = document.createElement('UL');
    hiddenMenuItemsList.classList.add('hidden-menu');
    hiddenMenuItems.appendChild(hiddenMenuItemsList);
    const menuWidth = menu.offsetWidth;

    let menuItemsWidth = 27;

    [...menuChildren].forEach((menuItem) => {
      menuItemsWidth += menuItem.offsetWidth;

      if (menuItemsWidth > menuWidth) {
        hiddenMenuItemsList.appendChild(menuItem);
      }
    });

    menu.appendChild(hiddenMenuItems);
  });
};

const createTabs = (tabsSelector) => {
  document.querySelectorAll(tabsSelector).forEach((tabs) => {
    tabs.querySelectorAll('[data-target]').forEach((el) => {
      el.addEventListener('click', () => {
        const activeTab = tabs.querySelector('[data-tab-active="true"]');
        const activeContent = tabs.querySelector(
          '[data-content-active="true"]',
        );
        if (activeTab) {
          activeTab.dataset.tabActive = false;
        }
        if (activeContent) {
          activeContent.dataset.contentActive = false;
        }
        el.dataset.tabActive = true;
        if (tabs.querySelector(`[data-source="${el.dataset.target}"]`)) {
          tabs.querySelector(
            `[data-source="${el.dataset.target}"]`,
          ).dataset.contentActive = true;
        }
      });
    });
  });
};

const cachingSvgSprite = () => {
  // Storing SVG Sprite in localStorage

  const file = 'img/sprite.svg';
  //const file = '/local/templates/main/img/sprite.svg';
  const revision = 6;

  if (
    !document.createElementNS ||
    !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
  )
    return true;

  var isLocalStorage =
      'localStorage' in window && window['localStorage'] !== null,
    request,
    data,
    insertIT = function() {
      document.body.insertAdjacentHTML('afterbegin', data);
    },
    insert = function() {
      if (document.body) insertIT();
      else document.addEventListener('DOMContentLoaded', insertIT);
    };

  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      //return true;
    }
  }

  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    };
    request.send();
  } catch (e) {}
};

document.addEventListener('DOMContentLoaded', () => {
  // Vue init
  // const app = new Vue({
  //   //el: '#app',
  // });

  const mainSlider = new Swiper('.main-slider__container', {
    loop: true,
    slidesPerView: 1,
  });
  const catalogSlider = new Swiper('.catalog-slider__container', {
    loop: true,
    slidesPerView: 1,
  });
  const bottomSlider = new Swiper('.bottom-slider__container', {
    loop: true,
    // Navigation arrows
    navigation: {
      prevEl: '.bottom-slider__button--prev',
      nextEl: '.bottom-slider__button--next',
    },
  });

  const collectionsSlider = new Swiper('.collections-slider__container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    // Navigation arrows
    navigation: {
      prevEl: '.collections-slider__button--prev',
      nextEl: '.collections-slider__button--next',
    },
    breakpoints: {
      // when window width is >= 320px
      600: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      1024: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      1760: {
        slidesPerView: 4,
      },
    },
  });

  const catalogDetailNavSlider = new Swiper(
    '.catalog-detail-nav-slider__container',
    {
      loop: true,
      slidesPerView: 3,
      loopedSlides: 3,
      spaceBetween: 5,

      freeMode: true,
      navigation: {
        prevEl: '.catalog-detail-slide__btn--prev',
        nextEl: '.catalog-detail-slide__btn--next',
      },

      breakpoints: {
        1281: {
          direction: 'horizontal',
        },
        992: {
          direction: 'vertical',
        },
        320: {
          direction: 'horizontal',
        },
      },
    },
  );
  const catalogDetailSlider = new Swiper('.catalog-detail-slider__container', {
    loop: true,
    thumbs: {
      swiper: catalogDetailNavSlider,
    },
  });

  document.querySelectorAll('.tab-certificate__title').forEach((el) => {
    el.addEventListener('click', () => {
      event.preventDefault();
      el.classList.toggle('tab-certificate__title--open');
      el.nextElementSibling.classList.toggle('tab-certificate__content--open');
    });
  });
  document.querySelectorAll('.tab-material__title').forEach((el) => {
    el.addEventListener('click', () => {
      event.preventDefault();
      el.classList.toggle('tab-material__title--open');
      el.nextElementSibling.classList.toggle('tab-material__content--open');
    });
  });

  const slideCatalogMenuToStart = () => {
    document
      .querySelector('.menu-catalog-sidebar')
      .classList.remove('menu-catalog-sidebar--open');

    const catalogMenuItems = document.querySelectorAll('.item-menu-catalog');

    if (catalogMenuItems) {
      catalogMenuItems.forEach((el) => {
        el.classList.remove('item-menu-catalog--open');
      });
    }
  };

  const catalogMenuBtn = document.querySelector('.js__catalog-menu-btn');
  if (catalogMenuBtn) {
    catalogMenuBtn.addEventListener('click', function() {
      event.preventDefault();
      this.classList.toggle('catalog-menu-btn--open');
      document.querySelector('.sidebar').classList.toggle('sidebar--open');
      document.body.classList.toggle('has-open-mobile-menu');
      slideCatalogMenuToStart();
    });
  }

  if (window.innerWidth < 1025) {
    const catalogMenuItems = document.querySelectorAll(
      '.item-menu-catalog--has-sub-menu',
    );

    if (catalogMenuItems) {
      catalogMenuItems.forEach((el) => {
        el.addEventListener('click', () => {
          el.classList.add('item-menu-catalog--open');
          const menuSidebar = document.querySelector('.menu-catalog-sidebar');
          menuSidebar.classList.add('menu-catalog-sidebar--open');
          menuSidebar.scrollTop = 0;
          event.preventDefault();
          event.stopPropagation();
        });
      });
    }

    const catalogSubMenuTitles = document.querySelectorAll(
      '.catalog-sub-menu__title',
    );
    if (catalogSubMenuTitles) {
      catalogSubMenuTitles.forEach((el) => {
        el.addEventListener('click', (el) => {
          slideCatalogMenuToStart();
          event.preventDefault();
          event.stopPropagation();
        });
      });
    }
  }

  document
    .querySelector('.js__mobile-search-btn')
    .addEventListener('click', function() {
      event.preventDefault();
      document
        .querySelector('.search-block')
        .classList.toggle('search-block--open');
    });

  responseMenu('.main-menu');
  responseMenu('.catalog-menu');
  cachingSvgSprite();

  createTabs("[data-is-tab='true']");

  // TODO: remove this on production
  if (
    'ontouchstart' in document.documentElement &&
    !document.body.classList.contains('bx-touch')
  ) {
    document.body.classList.add('bx-touch');
  }

  /////////////////////
  $('.form__add-file').click(function() {
    $(this)
      .next()
      .trigger('click');
  });

  const communicationMethodsForm = document.querySelector(
    '.form--communication-methods',
  );

  if (communicationMethodsForm) {
    const communicationMethodItems = communicationMethodsForm.querySelectorAll(
      '[data-communication-method]',
    );

    if (communicationMethodItems) {
      communicationMethodItems.forEach((el) => {
        el.addEventListener('click', () => {
          event.preventDefault();
          const communicationMethod = el.dataset.communicationMethod;
          const emailFormItem = document.querySelector('.item-form--email');
          if (communicationMethod === 'email') {
            emailFormItem.classList.remove('form__item--hidden');
          } else {
            emailFormItem.classList.add('form__item--hidden');
          }
          communicationMethodItems.forEach((el) => {
            el.classList.remove('item-communication-method--active');
          });
          el.classList.add('item-communication-method--active');
        });
      });
    }

    const addCommentBtn = communicationMethodsForm.querySelector(
      '.form__add-comment',
    );
    if (addCommentBtn) {
      addCommentBtn.addEventListener('click', (el) => {
        event.preventDefault();
        communicationMethodsForm
          .querySelector('.item-form--message')
          .classList.toggle('form__item--hidden');
      });
    } 
  }
});

window.addEventListener('resize', resizeThrottler, false);

var resizeTimeout;
function resizeThrottler() {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

function actualResizeHandler() {}
