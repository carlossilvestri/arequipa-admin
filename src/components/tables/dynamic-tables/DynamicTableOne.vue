<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table :class="tableClass">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              v-for="(col, cIndex) in columns"
              :key="cIndex"
              :class="col.thClass || defaultThClass"
            >
              <slot :name="`header-${col.key}`" :col="col">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ col.label }}
                </p>
              </slot>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-if="!loading"
            v-for="(row, rIndex) in rows"
            :key="rowKeyValue(row, rIndex)"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td
              v-for="(col, cIndex) in columns"
              :key="cIndex"
              :class="col.tdClass || defaultTdClass"
            >
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :col="col"
                :index="rIndex"
              >
                <template v-if="col.type === 'user'">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 overflow-hidden rounded-full">
                      <img :src="row.avatar" :alt="row.name" />
                    </div>
                    <div>
                      <span
                        class="block font-medium text-gray-800 text-theme-sm dark:text-white/90"
                        >{{ row.name }}</span
                      >
                      <span class="block text-gray-500 text-theme-xs dark:text-gray-400">{{
                        row.role
                      }}</span>
                    </div>
                  </div>
                </template>
                <template v-else-if="col.type === 'team'">
                  <div class="flex -space-x-2">
                    <div
                      v-for="(member, mIndex) in row[col.key] || []"
                      :key="mIndex"
                      class="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                    >
                      <img :src="member" alt="team member" />
                    </div>
                  </div>
                </template>
                <template v-else-if="col.type === 'status'">
                  <span
                    :class="[
                      'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                      {
                        'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                          ['ACTIVO'].includes(row[col.key]),
                        'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                          row[col.key] === 'Pending',
                        'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500': [
                          'INACTIVO',
                          'Cancel',
                        ].includes(row[col.key]),
                      },
                    ]"
                  >
                    {{ row[col.key] }}
                  </span>
                </template>
                <template v-else-if="col.type === 'actions'">
                  <div class="text-right">
                    <button
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-1"
                      @click="emit('edit', row)"
                    >
                      <EditIcon />
                    </button>
                    <button
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      @click="emit('delete', row)"
                    >
                      <TrashIconLg />
                    </button>
                  </div>
                </template>
                <template v-else>
                  <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ row[col.key] }}</p>
                </template>
              </slot>
            </td>
          </tr>
          <tr v-if="(!rows || rows.length === 0) && !loading">
            <td
              :colspan="columns.length"
              class="px-5 py-6 text-center text-gray-500 text-theme-sm dark:text-gray-400"
            >
              No hay datos
            </td>
          </tr>
          <tr v-if="loading">
            <td :colspan="columns.length" class="p-3 text-center">
              <div class="m-4">
                <pulse-loading />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import TrashIconLg from '@/icons/TrashIconLg.vue'
import EditIcon from '@/icons/EditIcon.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [
      { key: 'user', label: 'User', type: 'user', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
      { key: 'project', label: 'Project Name', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
      { key: 'team', label: 'Team', type: 'team', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
      {
        key: 'status',
        label: 'Status',
        type: 'status',
        thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
      },
      { key: 'budget', label: 'Budget', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    ],
  },
  rows: {
    type: Array,
    default: () => [
      {
        user: true,
        name: 'Lindsey Curtis',
        role: 'Web Designer',
        avatar: '/images/user/user-17.jpg',
        project: 'Agency Website',
        team: ['/images/user/user-22.jpg', '/images/user/user-23.jpg', '/images/user/user-24.jpg'],
        status: 'Active',
        budget: '3.9K',
      },
    ],
  },
  loading: { type: Boolean, default: false },
  tableClass: { type: String, default: 'min-w-full' },
  rowKey: { type: [String, Function], default: null },
})

const defaultTdClass = 'px-5 py-4 sm:px-6'
const defaultThClass = 'px-5 py-3 text-left sm:px-6'

const { columns, rows, tableClass, rowKey, loading } = toRefs(props)

function rowKeyValue(row, index) {
  const rk = rowKey?.value
  if (!rk) return index
  if (typeof rk === 'function') return rk(row, index)
  return row?.[rk] ?? index
}

const emit = defineEmits(['edit', 'delete'])
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
