/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/js/swiper.esm.bundle.js");


window.Vue = vue__WEBPACK_IMPORTED_MODULE_0__["default"];




window.jQuery = jquery__WEBPACK_IMPORTED_MODULE_2___default.a;
__webpack_require__(/*! @fancyapps/fancybox */ "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js"); 
 

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

  var file = 'img/sprite.svg',
    revision = 5;

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
      return true;
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

  const mainSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]('.main-slider__container', {
    loop: true,
    slidesPerView: 1,
  });
  const catalogSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]('.catalog-slider__container', {
    loop: true,
    slidesPerView: 1,
  });
  const bottomSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]('.bottom-slider__container', {
    loop: true,
    // Navigation arrows
    navigation: {
      prevEl: '.bottom-slider__button--prev',
      nextEl: '.bottom-slider__button--next',
    },
  });

  const collectionsSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]('.collections-slider__container', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 24,
    // Navigation arrows
    navigation: {
      prevEl: '.collections-slider__button--prev',
      nextEl: '.collections-slider__button--next',
    },
  });

  const catalogDetailNavSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"](
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
  const catalogDetailSlider = new swiper__WEBPACK_IMPORTED_MODULE_3__["default"]('.catalog-detail-slider__container', {
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

  responseMenu('.catalog-menu');
  cachingSvgSprite();

  createTabs("[data-is-tab='true']");
});


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/index.js ./src/scss/style.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");
module.exports = __webpack_require__(/*! ./src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map