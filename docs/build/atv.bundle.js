/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,Element,module,require */

(function () {

  'use strict';

  window.ATV = __webpack_require__(1);
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint undef: true,strict:true,trailing:true,loopfunc:true */
/* global document,window,Element,module */

// https://developer.apple.com/tvos/human-interface-guidelines/icons-and-images/layered-images/

/*
 * lsr
 * ©2017 David Miller
 * https://readmeansrun/com
 *
 * lsr is licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * http://designmodo.com/apple-tv-effect
 */

(function () {

  'use strict';

  const VERSION = '0.0.1',


  /*
   * Convert an array-like thing (ex: NodeList or arguments object) into a proper array
   *
   * @param list (array-like thing)
   * @return Array
   */
  arr = function (list) {

    var ret = [],
        i = 0;

    if (!list.length) {
      return ret;
    }

    for (i = 0; i < list.length; i++) {
      ret.push(list[i]);
    }

    return ret;
  },


  /*
   * Merge two objects into one, values in b take precedence over values in a
   *
   * @param a {Object}
   * @param b {Object}
    * @return Object
   */
  merge = function (a, b) {
    var o = {};
    for (var i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    if (!b) {
      return o;
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  };

  var LSR = function (config) {

    var i = 0,
        defaults = {
      node: document.body,
      shine: true,
      shadow: true,
      rotation: {
        x: 0.05,
        y: 0.05
      }
    },
        config = merge(defaults, arguments[0]) || defaults,
        imgs = [],
        supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (!config.node) {
      config.node = document.body;
    }

    if (typeof config.node == 'string') {
      config.node = document.querySelector(config.node);
    }

    if (!config.node instanceof Element) {
      throw new Error('Invalid ATV ' + config.node);
    }

    if (!config.rotation.hasOwnProperty('x')) {
      config.rotation.x = defaults.rotation.x;
    }
    if (!config.rotation.hasOwnProperty('y')) {
      config.rotation.y = defaults.rotation.y;
    }

    imgs = arr(config.node.querySelectorAll('.atv'));
    if (config.node.classList.contains('atv')) {
      imgs.push(config.node);
    }

    if (imgs.length <= 0) {
      return;
    }

    for (var l = 0; l < imgs.length; l++) {

      var thisImg = imgs[l],
          i = 0,
          layerElems = thisImg.querySelectorAll('.atv-layer');

      if (layerElems.length <= 0) {
        continue;
      }

      while (thisImg.firstChild) {
        thisImg.removeChild(thisImg.firstChild);
      }

      var containerHTML = document.createElement('div'),
          shineHTML = document.createElement('div'),
          shadowHTML = document.createElement('div'),
          layersHTML = document.createElement('div'),
          layers = [];

      containerHTML.className = 'atv-container';

      if (config.shine) {
        shineHTML.className = 'atv-shine';
        containerHTML.appendChild(shineHTML);
      }

      if (config.shadow) {
        shadowHTML.className = 'atv-shadow';
        containerHTML.appendChild(shadowHTML);
      }

      layersHTML.className = 'atv-layers';

      for (i = 0; i < layerElems.length; i++) {

        var layer = document.createElement('div'),
            imgSrc = layerElems[i].getAttribute('data-img');

        layer.className = 'atv-rendered-layer';
        layer.setAttribute('data-layer', i);
        layer.style.backgroundImage = 'url(' + imgSrc + ')';
        layersHTML.appendChild(layer);

        layers.push(layer);
      }

      containerHTML.appendChild(layersHTML);

      thisImg.appendChild(containerHTML);

      var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
      thisImg.style.transform = 'perspective(' + w * 3 + 'px)';

      if (supportsTouch) {
        window.preventScroll = false;

        (function (_thisImg, _layers, _totalLayers, _shine) {
          thisImg.addEventListener('touchmove', function (e) {
            if (window.preventScroll) {
              e.preventDefault();
            }
            processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
          });

          thisImg.addEventListener('touchstart', function (e) {
            window.preventScroll = true;
            processEnter(e, _thisImg);
          });

          thisImg.addEventListener('touchend', function (e) {
            window.preventScroll = false;
            processExit(e, _thisImg, _layers, _totalLayers, _shine);
          });
        })(thisImg, layers, layerElems.length, shineHTML);
      } else {

        (function (_thisImg, _layers, _totalLayers, _shine) {
          thisImg.addEventListener('mousemove', function (e) {
            processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
          });

          thisImg.addEventListener('focus', function (e) {
            processEnter(_thisImg);
          });

          thisImg.addEventListener('mouseenter', function (e) {
            processEnter(_thisImg);
          });

          thisImg.addEventListener('mouseleave', function (e) {
            processExit(_thisImg, _layers, _totalLayers, _shine);
          });

          thisImg.addEventListener('blur', function (e) {
            processExit(_thisImg, _layers, _totalLayers, _shine);
          });
        })(thisImg, layers, layerElems.length, shineHTML);
      }
    }

    function processMovement(e, touchEnabled, element, layers, totalLayers, shine) {

      var i = 0,
          bdst = document.body.scrollTop,
          bdsl = document.body.scrollLeft,
          pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
          pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
          offsets = element.getBoundingClientRect(),
          w = element.clientWidth || element.offsetWidth || element.scrollWidth,
          // width
      h = element.clientHeight || element.offsetHeight || element.scrollHeight,
          // height
      wMultiple = 320 / w,
          offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
          //cursor position X
      offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
          //cursor position Y
      dy = pageY - offsets.top - bdst - h / 2,
          //@h/2 = center of container
      dx = pageX - offsets.left - bdsl - w / 2,
          //@w/2 = center of container
      yRotate = (offsetX - dx) * (config.rotation.y * wMultiple),
          //rotation for container Y
      xRotate = (dy - offsetY) * (config.rotation.x * wMultiple),
          //rotation for container X
      imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
          //img transform
      angle = Math.atan2(dy, dx) * 180 / Math.PI - 90; //convert rad in degrees

      //get angle between 0-360
      if (angle < 0) {
        angle = angle + 360;
      }

      //container transform
      if (element.firstChild.className.indexOf(' over') != -1) {
        imgCSS += ' scale3d(' + config.scale + ',' + config.scale + ',' + config.scale + ')';
      }

      element.firstChild.style.transform = imgCSS;
      //gradient angle and opacity for shine
      if (shine) {
        shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
        shine.style.transform = 'translateX(' + offsetX * totalLayers - 0.1 + 'px) translateY(' + offsetY * totalLayers - 0.1 + 'px)';
      }

      //parallax for each layer
      var revNum = totalLayers;
      for (i = 0; i < totalLayers; i++) {
        layers[i].style.transform = 'translateX(' + offsetX * (totalLayers - i) * (i * 2.5 / wMultiple) + 'px) translateY(' + offsetY * totalLayers * (i * 2.5 / wMultiple) + 'px)';
        revNum--;
      }
    }

    function processEnter(element) {
      element.firstChild.classList.add('over');
    }

    function processExit(element, layers, totalLayers, shine) {

      var i = 0,
          container = element.firstChild;

      container.classList.remove('over');
      container.style.transform = '';
      shine.style.cssText = '';

      for (i = 0; i < totalLayers; i++) {
        layers[i].style.transform = '';
      }
    }
  };

  module.exports = LSR;
})();

/***/ })
/******/ ]);