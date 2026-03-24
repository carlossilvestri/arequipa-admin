import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export interface IndicatorConfig {
  elementos: any[]
  tipoperiodo: number | null | undefined
  desde: string | undefined
  hasta: string | undefined
}

export const useIndicatorConfigStore = defineStore(
  'indicatorConfig',
  () => {
    const copiedConfig = ref<IndicatorConfig | null>(null)

    const hasConfigToApply = computed(() => copiedConfig.value !== null)

    return {
      copiedConfig,
      hasConfigToApply,
      copyIndicatorConfig(config: IndicatorConfig) {
        copiedConfig.value = { ...config }
      },
      applyConfigToAll() {
        if (!copiedConfig.value) {
          throw new Error('No hay configuración copiada disponible')
        }
        return copiedConfig.value
      },
      clearAllConfigs() {
        copiedConfig.value = null
      },
    }
  },
  {
    persist: true,
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndicatorConfigStore, import.meta.hot))
}
