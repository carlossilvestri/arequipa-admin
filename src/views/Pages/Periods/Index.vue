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
            <Button variant="primary" @click="router.push(routes.admin.periods.new.path)"
              >Agregar</Button
            >
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="periodTypeStore.periods"
          :loading="loading"
          rowKey="idperiodo"
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
import { usePeriodStore } from '@/stores/period'
import { usePeriod } from '@/composables/usePeriod'
import type { BOPeriodo } from '@/interfaces'
import { routes } from '@/utilities/constants'

const { loadPeriods, loading, handleDelete, loadingDelete } = usePeriod()
const periodTypeStore = usePeriodStore()
const currentPageTitle = ref('Períodos')
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOPeriodo | null>(null)

function onEdit(row: BOPeriodo) {
  if (!row || row.idperiodo == null) return
  router.push(routes.admin.periods.edit.path.replace(':id', row.idperiodo.toString()))
}

function onDelete(row: BOPeriodo) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idperiodo)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load groups when component mounts
  await loadPeriods()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idperiodo',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'anio', label: 'Año', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'numeroperiodo',
      label: 'Nro. período',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'etiquetacorta',
      label: 'Etiqueta corta',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'etiquetalarga',
      label: 'Etiqueta larga',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'nombretipoperiodo',
      label: 'Tipo periodo',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'fechainicio',
      label: 'Fecha inicio',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'fechafin',
      label: 'Fecha fin',
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
