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
            <Button variant="primary" @click="router.push('/units-of-measure/new')">Agregar</Button>
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="mockInfoTable.rows"
          rowKey="id"
          @edit="onEdit"
          @delete="onDelete"
        />

        <AreYouSureModal
          :show-confirm="showConfirm"
          @confirm-no="confirmNo"
          @confirm-yes="confirmYes"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DynamicTableOne from '@/components/tables/dynamic-tables/DynamicTableOne.vue'
import AreYouSureModal from '@/components/common/custom/AreYouSureModal.vue'
import Button from '@/components/ui/Button.vue'
const currentPageTitle = ref('Unidades de Medida')
const router = useRouter()

const showConfirm = ref(false)
const rowToDelete = ref(null)

function onEdit(row) {
  if (!row || row.id == null) return
  router.push(`/units-of-measure/${row.id}`)
}

function onDelete(row) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo() {
  showConfirm.value = false
  rowToDelete.value = null
}

function confirmYes() {
  if (!rowToDelete.value) return
  const id = rowToDelete.value.id
  mockInfoTable.value.rows = mockInfoTable.value.rows.filter((r) => r.id !== id)
  showConfirm.value = false
  rowToDelete.value = null
}

const mockInfoTable = ref({
  columns: [
    {
      key: 'id',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-3/11 sm:px-6',
    },
    { key: 'name', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    { key: 'description', label: 'Descripción', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'status',
      label: 'Status',
      type: 'status',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'actions',
      label: 'Acciones',
      type: 'actions',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
  ],
  rows: [
    {
      id: 1,
      name: 'Metro',
      description: 'Metro',
      status: 'Active',
      actions: 'Acciones',
    },
    {
      id: 2,
      name: 'Kilometro',
      description: 'Kilometro',
      status: 'Pending',
      actions: 'Acciones',
    },
    {
      id: 3,
      name: 'Centimetro',
      description: 'Centimetro',
      status: 'Active',
      actions: 'Acciones',
    },
    {
      id: 4,
      name: 'Gramo',
      description: 'Gramo',
      status: 'Cancel',
      actions: 'Acciones',
    },
    {
      id: 5,
      name: 'Kilogramo',
      description: 'Kilogramo',
      status: 'Active',
    },
  ],
})
</script>
