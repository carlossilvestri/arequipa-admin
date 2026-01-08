import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref<boolean>(false)

    return {
      isDark,
      toggleTheme() {
        isDark.value = !isDark.value
      },
      saveThemeOnStore() {
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      },
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
