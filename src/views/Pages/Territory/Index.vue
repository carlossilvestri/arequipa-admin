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
            <Button variant="primary" @click="router.push(`/${mainRoute}/new`)">Agregar</Button>
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="territoryStore.territories"
          :loading="loading"
          rowKey="idterritorio"
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
import { useTerritoryStore } from '@/stores/territory'
import { useTerritory } from '@/composables/useTerritory'
import type { BOTerritorio } from '@/interfaces'

const { loadTerritories, loading, handleDelete, loadingDelete } = useTerritory()
const territoryStore = useTerritoryStore()
const currentPageTitle = ref('Territorios')
const mainRoute = 'territories'
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOTerritorio | null>(null)

function onEdit(row: BOTerritorio) {
  if (!row || row.idterritorio == null) return
  router.push(`/${mainRoute}/${row.idterritorio}`)
}

function onDelete(row: BOTerritorio) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idterritorio)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load subgroups when component mounts
  await loadTerritories()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idterritorio',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'nombreterritorio', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'idtipoterritorio',
      label: 'ID Tipo territorio',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'idterritoriopadre',
      label: 'ID Territorio padre',
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
