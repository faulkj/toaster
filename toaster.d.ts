declare global {

   interface ToasterInstance {
      readonly version: string
      el: HTMLDivElement
      options: Options
      eat(): void
      swallow(): void
   }

   interface Options {
      timeout?: number | null
      class?: string
      duration?: number
      anchor?: string
      icon?: string | null
      click?: ((event: MouseEvent) => void) | null
   }

}

export { ToasterInstance, Options }
