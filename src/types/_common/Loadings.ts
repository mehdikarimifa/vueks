export type Loadings = {
  list?: Boolean
  inputFields?: boolean
  selectFields?: boolean
  submitButton?: boolean
  isButtonLoading?: {
    tab: string
    index: number
  }
  deleteButton?: number
  others?: { [key: string]: boolean }
}
