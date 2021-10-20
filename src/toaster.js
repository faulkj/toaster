const toaster = {

   version      : "1.0",

   toastQueue   : [],

   currentToast : null,

   serve          : async function() {
      if(!this.toastQueue.length) return;
      var tst = this.toastQueue[0].t;
      var options = this.toastQueue[0].o;

      document.body.appendChild(tst);
      tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px";

      (() => {
         tst.style.transition = `clip-path ${options.duration}ms, ${options.anchor} ${options.duration}ms`;
         tst.style.clipPath = "inset(0)";
         let x = document.querySelectorAll("div.toaster").length;

         [...document.querySelectorAll("div.toaster")].forEach(el => {
            x--;
            el.style[options.anchor] = ((x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)))) + "px";
         });
      })();

      this.currentToast = tst;

      this.currentToast.dispatchEvent(new Event('baked'));

      this.currentToast.addEventListener('transitionend', function next(event) {
         if (event.propertyName != options.anchor) return;
         if(options.timeout) setTimeout(() => {
            tst.dispatchEvent(new Event('eat'));
         }, options.timeout);

         this.toastQueue.shift();
         event.target.removeEventListener('transitionend', next, false);
         event.target.dispatchEvent(new Event('served'));
         if(this.toastQueue.length) this.serve();
         else this.currentToast = null;
      }.bind(this), false);
   }

};

class Toast {

   constructor(msg, options = {}) {
      this.el = document.createElement("div");

      this.options = {
         timeout  : 2500,
         class    : "alert-primary",
         duration : 1000,
         anchor   : "bottom",
         icon     : null,
         iconLib  : "bi",
         click    : null
      };

      for(let opt in options) this.options[opt] = options[opt];

      var ico = this.options.icon ? `<div class="icon"><i class="${this.options.iconLib} ${this.options.iconLib}-${this.options.icon}"></i></div>` : "";

      this.el.className = `toaster alert ${this.options["class"]}`;
      this.el.innerHTML = `${ico}<div class="body">${msg}</div>`;

      this.el.addEventListener("eat", () => {
         this.el.style.opacity = 1;
         (() => {
            this.el.style.transition = `opacity ${this.options.duration}ms`;
            this.el.style.opacity = 0;
            this.el.addEventListener("transitionend", () => {
               this.el.style.display = "none";
               this.el.dispatchEvent(new Event('eaten'));
               this.el.remove();

               let x = document.querySelectorAll("div.toaster").length;
               [...document.querySelectorAll("div.toaster")].forEach(el => {
                  x--;
                  el.style[this.options.anchor] = (x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop))) + "px";
               });

               this.swallow();
            });
         })();
      });

      if(this.options.click) {
         this.el.style.cursor = "pointer";
         this.el.addEventListener("click", () => {
            this.options.click();
            this.el.dispatchEvent(new Event('eat'));
         });
      }

      toaster.toastQueue.push({
         t: this.el,
         o: this.options
      });

      setTimeout(() => this.el.dispatchEvent(new Event('bake')), 0);

      if(toaster.toastQueue.length == 1) setTimeout(() => toaster.serve(), 0);
   }

   addEventListener(event, callback) {
      this.el.addEventListener(event, callback);
      return this;
   }

   eat() {
      this.el.dispatchEvent(new Event('eat'));
   }

   swallow() {
      this.el.remove();
      delete this;
   }

}