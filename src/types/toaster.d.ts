declare module '@faulkj/toaster'

type opts = {
   timeout: number,
   class: string,
   duration: number,
   anchor: string,
   icon: string | null,
   click: ((event: Event) => void) | null
}

export default class Toaster {
   static version: string
   static toastQueue: { t: HTMLElement, o: opts }[]
   static currentToast: HTMLElement | null

   el: HTMLDivElement
   options: opts

   constructor(msg: string, options: opts)
   eat(): void
   swallow(): void
   static serve(): void
}
