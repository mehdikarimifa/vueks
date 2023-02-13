export type TableValue = {
  propName: string
  type: 'text' | 'image' | 'date' | 'status' | 'si-number' | 'price'
  status?: {
    title: string
    value: number
    color?:
      | 'primary'
      | 'secondary'
      | 'warn'
      | 'danger'
      | 'dark'
      | 'success'
      | 'transparent'
  }[]
  subPropName?: string
  maxWidth?: number
  textCenter?: boolean
}
