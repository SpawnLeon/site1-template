'use strict';

import $ from 'jquery';
window.jQuery = $;
require('@fancyapps/fancybox');
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

document.addEventListener('DOMContentLoaded', () => {
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
  document.querySelectorAll('.tab-materials__title').forEach((el) => {
    el.addEventListener('click', () => {
      event.preventDefault();
      el.classList.toggle('tab-materials__title--open');      
      el.nextElementSibling.classList.toggle('materials__content--open');
    });
  });

  responseMenu('.catalog-menu');
});
