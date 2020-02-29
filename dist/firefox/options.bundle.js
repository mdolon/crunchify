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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/options.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Example settings array
 */
var settings = [{
  id: 'testCheckbox',
  defaultValue: true
}, {
  id: 'testInput',
  defaultValue: 'John Doe'
}];
/**
 * Get settings values from local storage.
 * @return {Object} Settings
 */

var getOptions = function getOptions(callback) {
  return chrome.storage.sync.get(settings.map(function (s) {
    return s.id;
  }), callback);
};

var statusBox = document.getElementById('status');
/**
 * Set statusbox text for one second then remove it.
 */

var setStatusBox = function setStatusBox() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Options saved.';
  var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  statusBox.textContent = msg;

  if (clear) {
    setTimeout(function () {
      statusBox.textContent = '';
    }, duration);
  }
};
/**
 * Fetch option fields
 */


var saveOptions = function saveOptions() {
  var values = {};
  var input; // Iterate through settings and get values

  settings.forEach(function (s) {
    input = document.getElementById(s.id);
    values[s.id] = input.type === 'checkbox' ? input.checked : input.value;
  }); // Persist values and alert the user that options have been saved

  chrome.storage.sync.set(values, setStatusBox);
};
/**
 * Get options from local storage and update UI to reflect their state
 */


var restoreOptions = function restoreOptions() {
  getOptions(function (optionValues) {
    var input;
    settings.forEach(function (s) {
      input = document.getElementById(s.id);

      if (input.type === 'checkbox' && optionValues[s.id]) {
        input.checked = true;
      } else {
        input.value = optionValues[s.id];
      }
    });
  });
};
/* Set event listener and restore options only after the dom has fully loaded */


document.addEventListener('DOMContentLoaded', function () {
  /* When someone presses 'save', persist the options to local storage. */
  document.getElementById('save').addEventListener('click', saveOptions);
  /* Once the settings page has loaded, ensure UI reflects settings stored locally. */

  restoreOptions();
});

/***/ })

/******/ });
//# sourceMappingURL=options.bundle.js.map