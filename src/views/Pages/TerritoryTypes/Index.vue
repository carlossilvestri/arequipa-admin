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
            <Button variant="primary" @click="router.push(routes.admin.territoryTypes.new.path)"
              >Agregar</Button
            >
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="territoryTypeStore.territoryTypes"
          :loading="loading"
          rowKey="idtipoterritorio"
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
import { useTerritoryTypeStore } from '@/stores/territoryType'
import { useTerritoryType } from '@/composables/useTerritoryType'
import type { BOTipoTerritorio } from '@/interfaces'
import { routes } from '@/utilities/constants'

const { loadTerritoryTypes, loading, handleDelete, loadingDelete } = useTerritoryType()
const territoryTypeStore = useTerritoryTypeStore()
const currentPageTitle = ref('Tipos de territorio')
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOTipoTerritorio | null>(null)

function onEdit(row: BOTipoTerritorio) {
  if (!row || row.idtipoterritorio == null) return
  router.push(routes.admin.territoryTypes.edit.path.replace(':id', row.idtipoterritorio.toString()))
}

function onDelete(row: BOTipoTerritorio) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idtipoterritorio)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load groups when component mounts
  await loadTerritoryTypes()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idtipoterritorio',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'nombretipoterritorio', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'ordenjerarquico',
      label: 'Orden jerárquico',
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
