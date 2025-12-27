import axios from 'axios'
import type { App } from 'vue'
// src/symbols.ts
import type { InjectionKey } from 'vue'
import type { AxiosInstance } from 'axios'

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol('axios-instance')

// Create a custom instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://cloudmarket.tibuilder.net/ind_webapi', // Your API base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling placeholder
    if (error?.response?.status === 401) {
      // e.g., optionally trigger logout or redirect
    }
    return Promise.reject(error)
  },
)

// Define the install function as required by Vue plugins
export default {
  install: (app: App) => {
    // Make the axios instance globally available as $axios
    app.config.globalProperties.$axios = axiosInstance

    // Optional: Make it available for Composition API via provide/inject
    app.provide(AxiosKey, axiosInstance)
  },
}
