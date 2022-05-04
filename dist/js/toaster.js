/*!
 * Toaster v1.0.0
 * Kopimi 2022 Joshua Faulkenberry
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/toaster.scss":
/*!**************************!*\
  !*** ./src/toaster.scss ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Toast.js":
/*!**********************!*\
  !*** ./src/Toast.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toast": function() { return /* binding */ Toast; }
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var Toast = /*#__PURE__*/ function() {
    "use strict";
    function Toast(msg) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _this3 = this;
        _classCallCheck(this, Toast);
        this.version = toaster.version;
        this.el = document.createElement("div");
        this.options = {
            timeout: 2500,
            class: "alert-primary",
            duration: 1000,
            anchor: "bottom",
            icon: null,
            iconLib: "bi",
            click: null
        };
        for(var opt in options)this.options[opt] = options[opt];
        var ico = this.options.icon ? '<div class="icon"><i class="'.concat(this.options.iconLib, " ").concat(this.options.iconLib, "-").concat(this.options.icon, '"></i></div>') : "";
        this.el.className = "toaster alert ".concat(this.options["class"]);
        this.el.innerHTML = "".concat(ico, '<div class="body">').concat(msg, "</div>");
        this.el.addEventListener("eat", function() {
            var _this2 = _this3;
            _this3.el.style.opacity = 1;
            (function() {
                var _this = _this2;
                _this2.el.style.transition = "opacity ".concat(_this2.options.duration, "ms");
                _this2.el.style.opacity = 0;
                _this2.el.addEventListener("transitionend", function() {
                    var _this4 = _this;
                    _this.el.style.display = "none";
                    _this.el.dispatchEvent(new Event("eaten"));
                    _this.el.remove();
                    var x = document.querySelectorAll("div.toaster").length;
                    _toConsumableArray(document.querySelectorAll("div.toaster")).forEach(function(el) {
                        x--;
                        el.style[_this4.options.anchor] = x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)) + "px";
                    });
                    _this.swallow();
                });
            })();
        });
        if (this.options.click) {
            var _this1 = this;
            this.el.style.cursor = "pointer";
            this.el.addEventListener("click", function() {
                _this1.options.click();
                _this1.el.dispatchEvent(new Event("eat"));
            });
        }
        toaster.toastQueue.push({
            t: this.el,
            o: this.options
        });
        setTimeout(function() {
            return _this3.el.dispatchEvent(new Event("bake"));
        }, 0);
        if (toaster.toastQueue.length == 1) setTimeout(function() {
            return toaster.serve();
        }, 0);
    }
    _createClass(Toast, [
        {
            key: "addEventListener",
            value: function addEventListener(event, callback) {
                this.el.addEventListener(event, callback);
                return this;
            }
        },
        {
            key: "eat",
            value: function eat() {
                this.el.dispatchEvent(new Event("eat"));
            }
        },
        {
            key: "swallow",
            value: function swallow() {
                this.el.remove();
                delete this;
            }
        }
    ]);
    return Toast;
}();


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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/toaster.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toaster": function() { return /* binding */ toaster; }
/* harmony export */ });
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Toast */ "./src/Toast.js");
/* harmony import */ var _toaster_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toaster.scss */ "./src/toaster.scss");
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
/*!
 * Toaster v1.0
 *
 * Kopimi 2022 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */ 

var toaster = window.toaster = {
    version: "1.0",
    toastQueue: [],
    currentToast: null,
    serve: function serve() {
        var _this = this;
        if (!this.toastQueue.length) return;
        var tst = this.toastQueue[0].t;
        var options = this.toastQueue[0].o;
        document.body.appendChild(tst);
        tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px";
        tst.style.clipPath = "inset(0 0 " + (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px)";
        setTimeout(function() {
            tst.style.transition = "clip-path ".concat(options.duration, "ms, ").concat(options.anchor, " ").concat(options.duration, "ms");
            tst.style.clipPath = "inset(0)";
            var x = document.querySelectorAll("div.toaster").length;
            _toConsumableArray(document.querySelectorAll("div.toaster")).forEach(function(el) {
                x--;
                el.style[options.anchor] = x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)) + "px";
            });
        }, 0);
        this.currentToast = tst;
        this.currentToast.dispatchEvent(new Event("baked"));
        var next = function(event) {
            if (event.propertyName != options.anchor) return;
            if (options.timeout) setTimeout(function() {
                tst.dispatchEvent(new Event("eat"));
            }, options.timeout);
            _this.toastQueue.shift();
            event.target.removeEventListener("transitionend", next, false);
            event.target.dispatchEvent(new Event("served"));
            if (_this.toastQueue.length) _this.serve();
            else _this.currentToast = null;
        };
        this.currentToast.addEventListener("transitionend", next, false);
    }
};

}();
/******/ })()
;
//# sourceMappingURL=toaster.js.map