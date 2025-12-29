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
          :rows="userStore.users"
          :loading="loadingUsers"
          rowKey="idusuario"
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
import { useUserStore } from '@/stores/user'
import { useUser } from '@/composables/useUser'
import type { BOUsuario } from '@/interfaces'

const { loadUsers, loadingUsers, handleDelete, loadingDelete } = useUser()
const userStore = useUserStore()
const currentPageTitle = ref('Usuarios')
const mainRoute = 'users'
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOUsuario | null>(null)

function onEdit(row: BOUsuario) {
  if (!row || row.idusuario == null) return
  router.push(`/${mainRoute}/${row.idusuario}`)
}

function onDelete(row: BOUsuario) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  console.log('Confirming delete for user:', rowToDelete.value)
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idusuario)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load users when component mounts
  await loadUsers()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idusuario',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'nombre', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    { key: 'nick', label: 'Nick', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'estado',
      label: 'Estado',
      type: 'status',
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
