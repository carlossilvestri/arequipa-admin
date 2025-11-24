<template>
  <div class="wrapper">
    <label v-if="label" :for="name" class="text-gray-700 dark:text-gray-400">{{ label }}</label>
    <slot name="input">
      <input
        :id="name"
        class="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/3 dark:text-white/90"
        :class="{ field_error: errorMessage, valid: meta.valid }"
        v-model="value"
        :placeholder="placeholder"
        :type="type || 'text'"
      />
    </slot>

    <small :class="errorMessage ? 'error_message' : ''">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: String,
  placeholder: String,
  label: String,
})

const { value, errorMessage, meta } = useField(() => props.name)
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 3px;
}
.error_message {
  color: red;
}
.field_error {
  border: 1px solid red !important;
}
.input {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  border: 0.5px solid gray;
}
.input:focus {
  outline: none;
}
.valid {
  border: 1px solid green !important;
}
label {
  font-size: 14px;
  font-weight: 600;
}
</style>
