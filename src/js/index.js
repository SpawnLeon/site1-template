import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
  const mainSlider = new Swiper('.main-slider__container', {
    loop: true,
  });
  const catalogSlider = new Swiper('.catalog-slider__container', {
    loop: true,
  });
  const bottomSlider = new Swiper('.bottom-slider__container', {
    loop: true,
    // Navigation arrows
    navigation: {
      prevEl: '.bottom-slider__button--prev',
      nextEl: '.bottom-slider__button--next',
    },
  });
});
