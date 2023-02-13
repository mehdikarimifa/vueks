import type { KsNotification } from '@/types'
import { reactive } from 'vue'

const notifications: KsNotification[] = reactive([])

const methods = {
  addNotification(n: KsNotification): void {
    notifications.push({
      id: notifications.length + 1,
      position: n.position ?? 'left-bottom',
      color: n.color ?? 'secondary',
      title: n.title ?? '',
      text: n.text ?? '',
      content: n.content ?? '',
      duration: n.duration ?? null,
      icon: n.icon ?? '',
      closeable: n.closeable ?? true,
      ltr: n.ltr ?? false,
      closeOnClick: n.closeOnClick ?? false
    })
  },

  removeNotification(id: number): void {
    for (let i = 0; i < notifications.length; i++)
      if (notifications[i].id === id) notifications.splice(i, 1)
  }
}

export default {
  notifications,
  ...methods
}
