/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/format.js":
/*!***********************!*\
  !*** ./src/format.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   format: () => (/* binding */ format)\n/* harmony export */ });\n/* harmony import */ var _assets_magnify_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/magnify.svg */ \"./src/assets/magnify.svg\");\n/* harmony import */ var _assets_background_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/background.jpg */ \"./src/assets/background.jpg\");\n\n\n\nfunction format() {\n  const search = document.querySelector(\"#search\");\n  const background = document.querySelector(\".background\");\n\n  search.src = _assets_magnify_svg__WEBPACK_IMPORTED_MODULE_0__;\n  background.src = _assets_background_jpg__WEBPACK_IMPORTED_MODULE_1__;\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/format.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ \"./src/format.js\");\n/* harmony import */ var _weather_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weather.js */ \"./src/weather.js\");\n\n\n\n(0,_format_js__WEBPACK_IMPORTED_MODULE_0__.format)();\n(0,_weather_js__WEBPACK_IMPORTED_MODULE_1__.updateWeather)();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateWeather: () => (/* binding */ updateWeather)\n/* harmony export */ });\nfunction getWeather(location) {\n  return fetch(\n    `https://api.weatherapi.com/v1/current.json?key=7f47f9ba1d7d440a8ca25252230707&q=${location}`,\n    { mode: \"cors\" },\n  )\n    .then((response) => response.json())\n    .then((response) => ({\n      name: response.location.name,\n      region: response.location.region,\n      country: response.location.country,\n      condition: response.current.condition.text,\n      temp_c: response.current.temp_c,\n      temp_f: response.current.temp_f,\n      feelslike_c: response.current.feelslike_c,\n      feelslike_f: response.current.feelslike_f,\n    }));\n}\n\nlet check = true;\nlet celsius = true;\n\nfunction updateWeather() {\n  const input = document.querySelector(\"input\");\n  const search = document.querySelector(\"#search\");\n  const invalid = document.querySelector(\"#invalid\");\n  const name = document.querySelector(\"#name\");\n  const condition = document.querySelector(\"#condition\");\n  const temp = document.querySelector(\"#temp\");\n  const feelslike = document.querySelector(\"#feelslike\");\n  const measure = document.querySelector(\"#measure\");\n  \n  let data;\n  \n  function saveLocation(location) {\n    localStorage.setItem('lastLocation', location);\n  }\n  \n  function getLocation() {\n    return localStorage.getItem('lastLocation');\n  }\n\n  function savePreference(pref) {\n    localStorage.setItem(\"preference\", pref);\n  }\n\n  function getPreference() {\n    return localStorage.getItem(\"preference\");\n  }\n\n  const storedPref = getPreference();\n  if (storedPref === \"f\") {\n    celsius = false;\n    measure.textContent = \"Display °C\";\n  } else {\n    celsius = true;\n    measure.textContent = \"Display °F\";\n  }\n\n  if (check) {\n    // default location on page load\n    const lastLocation = getLocation();\n    if (lastLocation) {\n      getWeather(lastLocation).then((obj) => {\n        check = false;\n        invalid.textContent = \"\";\n        name.textContent = `${obj.name}, `;\n        if (obj.region === \"\") {\n          name.textContent += obj.country;\n        } else {\n          name.textContent += obj.region;\n        }\n        if (storedPref === \"f\") {\n          temp.textContent = `${obj.temp_f}°`;\n          feelslike.textContent = `Feels like ${obj.feelslike_f}°`;\n        }\n        else {\n          temp.textContent = `${obj.temp_c}°`;\n          feelslike.textContent = `Feels like ${obj.feelslike_c}°`;\n        }\n        condition.textContent = obj.condition;\n        data = obj;\n      });\n    } else {\n      getWeather(\"College Station\").then((obj) => {\n        check = false;\n        invalid.textContent = \"\";\n        name.textContent = `${obj.name}, `;\n        if (obj.region === \"\") {\n          name.textContent += obj.country;\n        } else {\n          name.textContent += obj.region;\n        }\n        if (storedPref === \"f\") {\n          temp.textContent = `${obj.temp_f}°`;\n          feelslike.textContent = `Feels like ${obj.feelslike_f}°`;\n        }\n        else {\n          temp.textContent = `${obj.temp_c}°`;\n          feelslike.textContent = `Feels like ${obj.feelslike_c}°`;\n        }\n        condition.textContent = obj.condition;\n        data = obj;\n      });\n    }\n  }\n\n  function handleSearch() {\n    const inputValue = input.value.trim();\n    if (inputValue !== '') {\n      getWeather(inputValue)\n        .then((obj) => {\n          saveLocation(inputValue);\n          input.value = '';\n          invalid.textContent = '';\n          name.textContent = `${obj.name}, `;\n          if (obj.region === '') {\n            name.textContent += obj.country;\n          } else {\n            name.textContent += obj.region;\n          }\n          if (celsius) {\n            temp.textContent = `${obj.temp_c}°`;\n            feelslike.textContent = `Feels like ${obj.feelslike_c}°`;\n          } else {\n            temp.textContent = `${obj.temp_f}°`;\n            feelslike.textContent = `Feels like ${obj.feelslike_f}°`;\n          }\n          data = obj;\n        })\n        .catch(() => {\n          input.value = '';\n          invalid.innerHTML = 'Location not found<br>Search must be formatted \"City\", \"City, State\", or \"City, Country\"';\n        });\n    }\n  }\n\n  search.addEventListener('click', handleSearch);\n\n  input.addEventListener('keyup', (event) => {\n    if (event.key === 'Enter') {\n      handleSearch();\n    }\n  });\n\n  measure.addEventListener(\"click\", () => {\n    if (measure.textContent === \"Display °F\") {\n      celsius = false;\n      savePreference('f');\n      measure.textContent = \"Display °C\";\n      temp.textContent = `${data.temp_f}°`;\n      feelslike.textContent = `Feels like ${data.feelslike_f}°`;\n    } else {\n      celsius = true;\n      savePreference('c');\n      measure.textContent = \"Display °F\";\n      temp.textContent = `${data.temp_c}°`;\n      feelslike.textContent = `Feels like ${data.feelslike_c}°`;\n    }\n  });\n}\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/weather.js?");

/***/ }),

/***/ "./src/assets/background.jpg":
/*!***********************************!*\
  !*** ./src/assets/background.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"507ee46596a408406f3b.jpg\";\n\n//# sourceURL=webpack://weather-app/./src/assets/background.jpg?");

/***/ }),

/***/ "./src/assets/magnify.svg":
/*!********************************!*\
  !*** ./src/assets/magnify.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"55cc940eaad8c48ae844.svg\";\n\n//# sourceURL=webpack://weather-app/./src/assets/magnify.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;