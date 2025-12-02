import { defineStore, acceptHMRUpdate } from 'pinia'

export type NotificationVariant = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: number
  message: string
  title?: string
  variant: NotificationVariant
  duration?: number
}

let idCounter = 1

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    notify(payload: Omit<Notification, 'id'>) {
      const id = idCounter++
      const duration = payload.duration ?? 4000
      const item: Notification = { id, ...payload }
      this.notifications.push(item)
      if (duration > 0) {
        setTimeout(() => this.remove(id), duration)
      }
      return id
    },
    success(message: string, title = 'Éxito', duration?: number) {
      return this.notify({ message, title, variant: 'success', duration })
    },
    error(message: string, title = 'Error', duration?: number) {
      return this.notify({ message, title, variant: 'error', duration })
    },
    info(message: string, title = 'Información', duration?: number) {
      return this.notify({ message, title, variant: 'info', duration })
    },
    remove(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
}
