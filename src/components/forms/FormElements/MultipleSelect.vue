<template>
  <div class="relative" ref="multiSelectRef">
    <label
      v-if="props.label"
      class="mb-0.5 block text-[13px] font-medium text-gray-700 dark:text-gray-400"
      :for="props.id"
      >{{ props.label }}</label
    >
    <div
      @click="toggleDropdown"
      class="dark:bg-dark-900 flex items-center w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 h-auto"
      :class="{ 'text-gray-800 dark:text-white/90': isOpen }"
    >
      <span v-if="selectedItems.length === 0" class="text-gray-400"> {{ props.placeholder }} </span>
      <div class="flex flex-wrap items-center flex-auto gap-2">
        <div
          v-for="item in selectedItems"
          :key="item.value"
          class="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-[11px] text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800 h-auto"
        >
          <span>{{ item.label }}</span>
          <button
            @click.stop="removeItem(item)"
            class="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
            aria-label="Remove item"
          >
            <svg
              role="button"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <svg
        class="ml-auto"
        :class="{ 'transform rotate-180': isOpen }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <teleport to="body">
        <div
          v-if="isOpen"
          class="fixed z-[9999] bg-white rounded-lg shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          :style="dropdownStyle"
        >
          <ul
            class="overflow-y-auto divide-y divide-gray-200 custom-scrollbar max-h-60 dark:divide-gray-800"
            role="listbox"
            aria-multiselectable="true"
          >
            <li
              v-for="item in props.options"
              :key="item.value"
              class="relative flex items-center w-full px-3 py-2 border-transparent cursor-pointer first:rounded-t-lg last:rounded-b-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="{ 'bg-gray-50 dark:bg-white/3': isSelected(item) }"
              role="option"
              :aria-selected="isSelected(item)"
            >
              <div class="flex items-center flex-1" @click.stop="toggleItem(item)">
                <input
                  type="checkbox"
                  :checked="isSelected(item)"
                  @click.stop="toggleItem(item)"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span class="ml-3 grow">{{ item.label }}</span>
              </div>
            </li>
          </ul>
        </div>
      </teleport>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Seleccionar...',
  },
  label: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedItems = ref(props.modelValue)
const multiSelectRef = ref(null)

// Calcular la posición del dropdown
const dropdownStyle = computed(() => {
  if (!isOpen.value || !multiSelectRef.value) return {}

  const rect = multiSelectRef.value.getBoundingClientRect()
  const dropdownHeight = 240 // Altura aproximada del dropdown (max-h-60)
  const viewportHeight = window.innerHeight
  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top

  // Determinar si el dropdown debe ir arriba o abajo
  const showAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight

  const top = showAbove ? rect.top - dropdownHeight : rect.bottom

  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    maxHeight: `${Math.min(dropdownHeight, showAbove ? spaceAbove - 10 : spaceBelow - 10)}px`,
  }
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const toggleItem = (item) => {
  const index = selectedItems.value.findIndex((selected) => selected.value === item.value)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
  emit('update:modelValue', selectedItems.value)
}

const removeItem = (item) => {
  const index = selectedItems.value.findIndex((selected) => selected.value === item.value)
  if (index !== -1) {
    selectedItems.value.splice(index, 1)
    emit('update:modelValue', selectedItems.value)
  }
}

const isSelected = (item) => {
  return selectedItems.value.some((selected) => selected.value === item.value)
}

const handleClickOutside = (event) => {
  if (multiSelectRef.value && !multiSelectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for changes to modelValue prop
watch(
  () => props.modelValue,
  (newValue) => {
    selectedItems.value = newValue || []
  },
  { immediate: true },
)
</script>
