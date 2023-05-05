/*!
 * Toaster v2.0.1
 *
 * Kopimi 2023 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */

import "../scss/toaster.scss"
import type { opts } from '../types/toaster'

export default class Toaster {

   static readonly version     : string = "2.0.1"
   static toastQueue  : {
                           t: HTMLElement,
                           o: any
                        }[] = []
   static currentToast: HTMLElement | null

   el: HTMLDivElement = document.createElement("div")
   options: opts

   constructor(msg: string, options: opts) {
      this.options = {
         ...{
            timeout: 2500,
            class: "",
            duration: 1000,
            anchor: "bottom",
            icon: null,
            click: null
         }, ...options
      }

      var ico = this.options.icon ? `<div class="icon"><i class="${this.options.icon}"></i></div>` : ""

      this.el.className = `toaster ${this.options["class"]}`
      this.el.innerHTML = `${ico}<div class="body">${msg}</div>`

      this.el.addEventListener("eat", () => {
         this.el.style.opacity = `1`;

         (() => {
            this.el.style.transition = `opacity ${this.options.duration}ms`
            this.el.style.opacity = `0`
            this.el.addEventListener("transitionend", () => {
               this.el.style.display = "none"
               this.el.dispatchEvent(new Event('eaten'))
               this.el.remove()

               let x = document.querySelectorAll("div.toaster").length
               Array.from(document.querySelectorAll("div.toaster")).forEach((tst: HTMLDivElement | any) => {
                  x--
                  tst.style[this.options.anchor] = (x * (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop))) + "px"
               })

               this.swallow()
            })
         })()
      })

      if (this.options.click) {
         this.el.style.cursor = "pointer"
         this.el.addEventListener("click", e => {
            if (this.options.click) this.options.click(e)
            this.el.dispatchEvent(new Event('eat'))
         })
      }

      Toaster.toastQueue.push({
         t: this.el,
         o: this.options
      });

      (() => this.el.dispatchEvent(new Event('bake')))()

      if (Toaster.toastQueue.length == 1) (() => Toaster.serve())()
   }

   eat() {
      this.el.dispatchEvent(new Event('eat'))
   }

   swallow() {
      this.el.remove()
      Toaster.currentToast = null
   }

   static serve() {
      if (!this.toastQueue.length) return
      var tst = this.toastQueue[0].t
      var options = this.toastQueue[0].o

      document.body.appendChild(tst)
      tst.style[options.anchor] = 0 - (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + "px"
      tst.style.clipPath = `inset(0 0 ` + (tst.offsetHeight + parseInt(getComputedStyle(tst).marginBottom) + parseInt(getComputedStyle(tst).marginTop)) + `px)`;

      (() => {
         tst.style.transition = `clip-path ${options.duration}ms, ${options.anchor} ${options.duration}ms`
         tst.style.clipPath = "inset(0)"
         let x = document.querySelectorAll("div.toaster").length

         Array.from(document.querySelectorAll("div.toaster")).forEach((el: HTMLDivElement | any) => {
            x--
            el.style[options.anchor] = ((x * (el.offsetHeight + parseInt(getComputedStyle(el).marginBottom) + parseInt(getComputedStyle(el).marginTop)))) + "px"
         })
      })()

      this.currentToast = tst

      this.currentToast?.dispatchEvent(new Event('baked'))

      const next = (event: any) => {
         if (event.propertyName != options.anchor) return
         if (options.timeout) setTimeout(() => {
            tst?.dispatchEvent(new Event('eat'))
         }, options.timeout)

         this.toastQueue.shift()
         event.target.removeEventListener('transitionend', next, false)
         event.target.dispatchEvent(new Event('served'))
         if (this.toastQueue.length) this.serve()
      }

      this.currentToast?.addEventListener('transitionend', next)
   }

}