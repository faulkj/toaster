import regeneratorRuntime from "regenerator-runtime";
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
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
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var toaster = {
    version: "1.0",
    toastQueue: [],
    currentToast: null,
    serve: function() {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var tst, options;
            return regeneratorRuntime.wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (this.toastQueue.length) {
                            _ctx.next = 2;
                            break;
                        }
                        return _ctx.abrupt("return");
                    case 2:
                        tst = this.toastQueue[0].t;
                        options = this.toastQueue[0].o;
                        document.body.appendChild(tst);
                        tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px";
                        (function() {
                            tst.style.transition = "clip-path ".concat(options.duration, "ms, ").concat(options.anchor, " ").concat(options.duration, "ms");
                            tst.style.clipPath = "inset(0)";
                            var x = document.querySelectorAll("div.toaster").length;
                            _toConsumableArray(document.querySelectorAll("div.toaster")).forEach(function(el) {
                                x--;
                                el.style[options.anchor] = x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)) + "px";
                            });
                        })();
                        this.currentToast = tst;
                        this.currentToast.dispatchEvent(new Event('baked'));
                        this.currentToast.addEventListener('transitionend', (function next(event) {
                            if (event.propertyName != options.anchor) return;
                            if (options.timeout) setTimeout(function() {
                                tst.dispatchEvent(new Event('eat'));
                            }, options.timeout);
                            this.toastQueue.shift();
                            event.target.removeEventListener('transitionend', next, false);
                            event.target.dispatchEvent(new Event('served'));
                            if (this.toastQueue.length) this.serve();
                            else this.currentToast = null;
                        }).bind(this), false);
                    case 10:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee, this);
        }));
        return function() {
            return _ref.apply(this, arguments);
        };
    }()
};
var Toast = /*#__PURE__*/ function() {
    "use strict";
    function Toast(msg, param) {
        var options = param === void 0 ? {
        } : param;
        var _this = this, _this1 = this;
        _classCallCheck(this, Toast);
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
        var ico = this.options.icon ? "<div class=\"icon\"><i class=\"".concat(this.options.iconLib, " ").concat(this.options.iconLib, "-").concat(this.options.icon, "\"></i></div>") : "";
        this.el.className = "toaster alert ".concat(this.options["class"]);
        this.el.innerHTML = "".concat(ico, "<div class=\"body\">").concat(msg, "</div>");
        this.el.addEventListener("eat", function() {
            var _this2 = _this;
            _this.el.style.opacity = 1;
            (function() {
                var _this5 = _this2;
                _this2.el.style.transition = "opacity ".concat(_this2.options.duration, "ms");
                _this2.el.style.opacity = 0;
                _this2.el.addEventListener("transitionend", function() {
                    var _this6 = _this5;
                    _this5.el.style.display = "none";
                    _this5.el.dispatchEvent(new Event('eaten'));
                    _this5.el.remove();
                    var x = document.querySelectorAll("div.toaster").length;
                    _toConsumableArray(document.querySelectorAll("div.toaster")).forEach(function(el) {
                        x--;
                        el.style[_this6.options.anchor] = x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)) + "px";
                    });
                    _this5.swallow();
                });
            })();
        });
        if (this.options.click) {
            var _this2 = this;
            this.el.style.cursor = "pointer";
            this.el.addEventListener("click", function() {
                _this2.options.click();
                _this2.el.dispatchEvent(new Event('eat'));
            });
        }
        toaster.toastQueue.push({
            t: this.el,
            o: this.options
        });
        setTimeout(function() {
            return _this1.el.dispatchEvent(new Event('bake'));
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
                this.el.dispatchEvent(new Event('eat'));
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
