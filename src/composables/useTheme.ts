// composables/useTheme.ts
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

export const useTheme = () => {
  const themeStore = useThemeStore()
  const { isDark } = storeToRefs(themeStore)

  const applyDomClass = (dark: boolean) => {
    const el = document.documentElement
    if (dark) {
      el.classList.add('dark')
    } else {
      el.classList.remove('dark')
    }
  }

  const enableDarkMode = () => {
    isDark.value = true
    themeStore.saveThemeOnStore()
    applyDomClass(true)
  }

  const enableLightMode = () => {
    isDark.value = false
    themeStore.saveThemeOnStore()
    applyDomClass(false)
  }

  const toggleTheme = () => {
    isDark.value ? enableLightMode() : enableDarkMode()
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') return enableDarkMode()
    if (savedTheme === 'light') return enableLightMode()

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    prefersDark ? enableDarkMode() : enableLightMode()
  }

  // Mantener DOM y storage sincronizados al cambiar isDark desde cualquier parte de la app
  const stop = watch(
    isDark,
    (val) => {
      applyDomClass(val)
      themeStore.saveThemeOnStore()
    },
    { immediate: false },
  )

  let mediaQuery: MediaQueryList | null = null

  onMounted(() => {
    initTheme()

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      // Solo seguir la preferencia del sistema si no hay preferencia guardada explícita
      if (!localStorage.getItem('theme')) {
        e.matches ? enableDarkMode() : enableLightMode()
      }
    }
    mediaQuery.addEventListener('change', handler)

    // Limpieza
    onBeforeUnmount(() => {
      stop()
      mediaQuery && mediaQuery.removeEventListener('change', handler)
    })
  })

  return {
    isDark,
    toggleTheme,
    enableDarkMode,
    enableLightMode,
    initTheme,
  }
}
