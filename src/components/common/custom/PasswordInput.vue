<template>
  <div>
    <div>
      <label
        for="password"
        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
      >
        {{ props.label }}<span class="text-error-500">*</span>
      </label>
      <div class="relative">
        <input
          :value="props.value"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          :placeholder="props.placeholder"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          @input="emit('input', $event)"
          @blur="emit('blur', $event)"
        />
        <span
          @click="togglePasswordVisibility"
          class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
        >
          <EyeIcon v-if="showPassword" />
          <CloseEye v-else />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EyeIcon from '@/icons/EyeIcon.vue'
import CloseEye from '@/icons/CloseEye.vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Contraseña',
  },
  placeholder: {
    type: String,
    default: 'Ingrese su contraseña',
  },
})

const showPassword = ref(false)
const emit = defineEmits(['blur', 'input'])

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style lang="scss" scoped></style>
