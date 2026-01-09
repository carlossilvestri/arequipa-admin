<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard :title="currentPageTitle">
        <template #header>
          <div class="flex justify-between">
            <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
              {{ currentPageTitle }}
            </h3>
            <Button variant="primary" @click="router.push(routes.admin.periodTypes.new.path)"
              >Agregar</Button
            >
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="periodTypeStore.periodTypes"
          :loading="loading"
          rowKey="idtipoperiodo"
          @edit="onEdit"
          @delete="onDelete"
        />

        <AreYouSureModal
          :show-confirm="showConfirm"
          @confirm-no="confirmNo"
          @confirm-yes="confirmYes"
          :loading="loadingDelete"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DynamicTableOne from '@/components/tables/dynamic-tables/DynamicTableOne.vue'
import AreYouSureModal from '@/components/common/custom/AreYouSureModal.vue'
import Button from '@/components/ui/Button.vue'
import { usePeriodTypeStore } from '@/stores/periodType'
import { usePeriodType } from '@/composables/usePeriodType'
import type { BOTipoPeriodo } from '@/interfaces'
import { routes } from '@/utilities/constants'

const { loadPeriodTypes, loading, handleDelete, loadingDelete } = usePeriodType()
const periodTypeStore = usePeriodTypeStore()
const currentPageTitle = ref('Tipos de período')
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOTipoPeriodo | null>(null)

function onEdit(row: BOTipoPeriodo) {
  if (!row || row.idtipoperiodo == null) return
  router.push(routes.admin.periodTypes.edit.path.replace(':id', row.idtipoperiodo.toString()))
}

function onDelete(row: BOTipoPeriodo) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idtipoperiodo)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load groups when component mounts
  await loadPeriodTypes()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idtipoperiodo',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'nombretipoperiodo', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'cantidadmeses',
      label: 'Cantidad de meses',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'actions',
      label: 'Acciones',
      type: 'actions',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6 text-right',
    },
  ],
})
</script>
