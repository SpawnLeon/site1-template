import Swiper from 'swiper';


document.addEventListener('DOMContentLoaded', () => {
  const mainSlider = new Swiper('.main-slider__container', {
    loop: true,
  });
  const catalogSlider = new Swiper('.catalog-slider__container', {
    loop: true,
  });
});
