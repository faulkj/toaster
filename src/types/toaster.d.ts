declare module '@faulkj/toaster'

export default class Toaster {
   static version: string
   static toastQueue: { t: HTMLElement, o: Options }[]
   static currentToast: HTMLElement | null

   el: HTMLDivElement
   options: Options

   constructor(msg: string, options: Options)
   eat(): void
   swallow(): void
   static serve(): void
}

type Options = {
   timeout?: number,
   class?: string,
   duration?: number,
   anchor?: string,
   icon?: string | null,
   click?: ((event: Event) => void) | null
}