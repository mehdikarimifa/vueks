import type { _Color } from './_Color'

export type KsNotification = {
  id?: number | null
  color?: _Color
  title?: string
  text?: string
  position?:
    | 'top'
    | 'bottom'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
  content?: string
  duration?: number | null
  icon?: string
  closeable?: boolean
  ltr?: boolean
  closeOnClick?: boolean
}
