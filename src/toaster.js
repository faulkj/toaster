/*!
 * Toaster v1.0
 *
 * Kopimi 2022 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */

 import Toast from "./Toast";
 import "./toaster.scss";

export const toaster = window.toaster = {

   version      : "1.0",

   toastQueue   : [],

   currentToast : null,

   serve        : function() {
                     if(!this.toastQueue.length) return;
                     var tst = this.toastQueue[0].t;
                     var options = this.toastQueue[0].o;

                     document.body.appendChild(tst);
                     tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px";
                     tst.style.clipPath = `inset(0 0 ` + (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + `px)`;

                     setTimeout(() => {
                        tst.style.transition = `clip-path ${options.duration}ms, ${options.anchor} ${options.duration}ms`;
                        tst.style.clipPath = "inset(0)";
                        let x = document.querySelectorAll("div.toaster").length;

                        [...document.querySelectorAll("div.toaster")].forEach(el => {
                           x--;
                           el.style[options.anchor] = ((x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)))) + "px";
                        });
                     }, 0);

                     this.currentToast = tst;

                     this.currentToast.dispatchEvent(new Event('baked'));

                     const next = (event) => {
                        if (event.propertyName != options.anchor) return;
                        if(options.timeout) setTimeout(() => {
                           tst.dispatchEvent(new Event('eat'));
                        }, options.timeout);

                        this.toastQueue.shift();
                        event.target.removeEventListener('transitionend', next, false);
                        event.target.dispatchEvent(new Event('served'));
                        if(this.toastQueue.length) this.serve();
                        else this.currentToast = null;
                     };

                     this.currentToast.addEventListener('transitionend', next, false);
                  }

};
