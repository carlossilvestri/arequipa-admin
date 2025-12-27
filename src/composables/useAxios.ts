import { inject } from 'vue'
import type { AxiosInstance } from 'axios'
import { AxiosKey, axiosInstance } from '@/plugins/axios'

export function useAxios(): AxiosInstance {
  return inject(AxiosKey, axiosInstance)
}
