<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Unidades de Medida">
        <template #header>
          <div class="flex justify-between">
            <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
              {{ currentPageTitle }}
            </h3>
            <Button variant="primary" @click="router.push(routes.admin.unitsOfMeasure.new.path)"
              >Agregar</Button
            >
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="unitMeasureStore.unitMeasures"
          :loading="loading"
          rowKey="idunidadmedida"
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
import { useUnitMeasureStore } from '@/stores/unitMeasure'
import { useUnitMeasure } from '@/composables/useUnitMeasure'
import type { BOUnidadMedida } from '@/interfaces'
import { routes } from '@/utilities/constants'

const { loadUnitMeasures, loading, handleDelete, loadingDelete } = useUnitMeasure()
const unitMeasureStore = useUnitMeasureStore()
const currentPageTitle = ref('Unidades de Medida')
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOUnidadMedida | null>(null)

function onEdit(row: BOUnidadMedida) {
  if (!row || row.idunidadmedida == null) return
  router.push(routes.admin.unitsOfMeasure.edit.path.replace(':id', row.idunidadmedida.toString()))
}

function onDelete(row: BOUnidadMedida) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idunidadmedida)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load unit measures when component mounts
  await loadUnitMeasures()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idunidadmedida',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'nombreunidadmedida', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    { key: 'simbolounidadmedida', label: 'Símbolo', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'descripcionunidadmedida',
      label: 'Descripción',
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
