export const getFallbackImage = (event: Event) => {
  ;(<HTMLImageElement>event.target).src = '/img/image-placeholder.svg'
}
