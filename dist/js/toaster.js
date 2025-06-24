(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Toaster = factory());
})(this, (function () { 'use strict';

    /*!
     * Toaster v2.1.1
     *
     * Kopimi 2025 Joshua Faulkenberry
     * Unlicensed under The Unlicense
     * http://unlicense.org/
     */
    class Toaster {
        constructor(msg, options) {
            this.version = "2.1.1";
            this.el = document.createElement("div");
            this.options = Object.assign({
                timeout: 2500,
                class: "",
                duration: 1000,
                anchor: "bottom",
                icon: null,
                click: null
            }, options);
            var ico = this.options.icon ? `<div class="icon"><i class="${this.options.icon}"></i></div>` : "";
            this.el.className = `toaster ${this.options["class"]}`;
            this.el.innerHTML = `${ico}<div class="body">${msg}</div>`;
            this.el.addEventListener("eat", () => {
                this.el.style.opacity = `1`;
                (() => {
                    this.el.style.transition = `opacity ${this.options.duration}ms`;
                    this.el.style.opacity = `0`;
                    this.el.addEventListener("transitionend", () => {
                        this.el.style.display = "none";
                        this.el.dispatchEvent(new Event('eaten'));
                        this.el.remove();
                        let x = document.querySelectorAll("div.toaster").length;
                        Array.from(document.querySelectorAll("div.toaster")).forEach((tst) => {
                            x--;
                            tst.style[this.options.anchor] = (x * (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop))) + "px";
                        });
                        this.swallow();
                    });
                })();
            });
            if (this.options.click) {
                this.el.style.cursor = "pointer";
                this.el.addEventListener("click", e => {
                    if (this.options.click)
                        this.options.click(e);
                    this.el.dispatchEvent(new Event('eat'));
                });
            }
            Toaster.toastQueue.push({
                t: this.el,
                o: this.options
            });
            (() => this.el.dispatchEvent(new Event('bake')))();
            if (Toaster.toastQueue.length == 1)
                (() => Toaster.serve())();
        }
        eat() {
            this.el.dispatchEvent(new Event('eat'));
        }
        swallow() {
            this.el.remove();
            Toaster.currentToast = null;
        }
        static serve() {
            var _a, _b;
            if (!Toaster.toastQueue.length)
                return;
            var tst = Toaster.toastQueue[0].t;
            var options = Toaster.toastQueue[0].o;
            document.body.appendChild(tst);
            tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px";
            tst.style.clipPath = `inset(0 0 ` + (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + `px)`;
            (() => {
                tst.style.transition = `clip-path ${options.duration}ms, ${options.anchor} ${options.duration}ms`;
                tst.style.clipPath = "inset(0)";
                let x = document.querySelectorAll("div.toaster").length;
                Array.from(document.querySelectorAll("div.toaster")).forEach((el) => {
                    x--;
                    el.style[options.anchor] = ((x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)))) + "px";
                });
            })();
            Toaster.currentToast = tst;
            (_a = Toaster.currentToast) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new Event('baked'));
            const next = (event) => {
                if (event.propertyName != options.anchor)
                    return;
                if (options.timeout)
                    setTimeout(() => {
                        tst === null || tst === void 0 ? void 0 : tst.dispatchEvent(new Event('eat'));
                    }, options.timeout);
                Toaster.toastQueue.shift();
                event.target.removeEventListener('transitionend', next, false);
                event.target.dispatchEvent(new Event('served'));
                if (Toaster.toastQueue.length)
                    this.serve();
            };
            (_b = Toaster.currentToast) === null || _b === void 0 ? void 0 : _b.addEventListener('transitionend', next);
        }
    }
    Toaster.toastQueue = [];
    Toaster.currentToast = null;

    return Toaster;

}));
//# sourceMappingURL=toaster.js.map
