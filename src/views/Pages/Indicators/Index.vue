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
            <Button variant="primary" @click="router.push(`/${mainRoute}/new`)">Agregar</Button>
          </div>
          <!-- Filtros -->
          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                for="nombre"
                >Nombre</label
              >
              <input
                v-model="filters.nombre"
                id="nombre"
                type="text"
                placeholder=""
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                autocomplete="off"
              />
            </div>
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                for="codigo"
                >Código</label
              >
              <input
                v-model="filters.codigo"
                id="codigo"
                type="text"
                placeholder=""
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                autocomplete="off"
              />
            </div>
            <div>
              <SelectInput
                :model-value="filters.groupId"
                @update:model-value="(v) => (filters.groupId = String(v))"
                :options="computedValues.groupOptions"
                label="Grupo"
                placeholder="Seleccione un grupo"
              />
            </div>
            <div>
              <SelectInput
                :model-value="filters.subgroupId"
                @update:model-value="(v) => (filters.subgroupId = String(v))"
                :options="computedValues.subgroupsFilter"
                label="Subgrupo"
                placeholder="Seleccione un subgrupo"
              />
            </div>
            <div class="flex items-end justify-end">
              <Button class="mr-2" variant="outline" @click="onReset">Resetear</Button>
              <Button variant="primary" @click="onSearch">Buscar</Button>
            </div>
          </div>
        </template>
        <DynamicTableOne
          :columns="mockInfoTable.columns"
          :rows="indicatorStore.indicators"
          :loading="loading"
          rowKey="idindicador"
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
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DynamicTableOne from '@/components/tables/dynamic-tables/DynamicTableOne.vue'
import AreYouSureModal from '@/components/common/custom/AreYouSureModal.vue'
import Button from '@/components/ui/Button.vue'
import { useIndicatorStore } from '@/stores/indicator'
import { useIndicator } from '@/composables/useIndicator'
import type { BOIndicador, FilterBOIndicador } from '@/interfaces'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { getIndicators } from '@/services/indicator'
import { getGroups } from '@/services/group'
import { getSubgroups } from '@/services/subgroup'
import { getUnitMeasures } from '@/services/unitMeasure'

const { loadIndicators, loading, handleDelete, loadingDelete } = useIndicator()
const indicatorStore = useIndicatorStore()
const currentPageTitle = ref('Indicadores')
const mainRoute = 'indicators'
const router = useRouter()
const showConfirm = ref(false)
const rowToDelete = ref<BOIndicador | null>(null)

function onEdit(row: BOIndicador) {
  if (!row || row.idindicador == null) return
  router.push(`/${mainRoute}/${row.idindicador}`)
}

function onDelete(row: BOIndicador) {
  rowToDelete.value = row
  showConfirm.value = true
}

function confirmNo(): void {
  showConfirm.value = false
  rowToDelete.value = null
}

const confirmYes = async (): Promise<void> => {
  if (!rowToDelete.value) return
  const id: number = Number(rowToDelete.value.idindicador)
  await handleDelete(id)
  showConfirm.value = false
}

// rows and loading come directly from the store/composable to avoid nested refs

onMounted(async () => {
  // Load indicators when component mounts
  await loadIndicators()
  await handleLoadThirdPartyData()
})

const mockInfoTable = ref({
  columns: [
    {
      key: 'idindicador',
      label: 'Id',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    { key: 'codigoindicador', label: 'Código', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    { key: 'nombreindicador', label: 'Nombre', thClass: 'px-5 py-3 text-left w-2/11 sm:px-6' },
    {
      key: 'nombregrupo',
      label: 'Grupo',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'nombresubgrupo',
      label: 'Subgrupo',
      thClass: 'px-5 py-3 text-left w-2/11 sm:px-6',
    },
    {
      key: 'nombreunidadmedida',
      label: 'Unidad de medida',
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

// --- Filters ---
const filters = ref({
  nombre: '',
  codigo: '',
  groupId: '',
  subgroupId: '',
  unitMeasureId: '',
})

// Third-party data for selects
const groups = ref<any[]>([])
const subgroups = ref<any[]>([])
const subgroupsFilter = ref<any[]>([])
const unitMeasures = ref<any[]>([])

const handleLoadThirdPartyData = async () => {
  const [resultGroups, resultSubgroups, resultUnits] = await Promise.all([
    getGroups({}),
    getSubgroups({}),
    getUnitMeasures({}),
  ])
  groups.value = resultGroups ?? []
  subgroups.value = resultSubgroups ?? []
  unitMeasures.value = resultUnits ?? []
}

const computedValues = computed(() => ({
  groupOptions: groups.value.map((g) => ({ value: String(g.idgrupo), label: g.nombregrupo })),
  unitMeasureOptions: unitMeasures.value.map((u) => ({
    value: String(u.idunidadmedida),
    label: u.nombreunidadmedida,
  })),
  subgroupsFilter: subgroupsFilter.value.map((s) => ({
    value: String(s.idsubgrupo),
    label: s.nombresubgrupo,
  })),
}))

watch(
  () => filters.value.groupId,
  (newGroupId) => {
    if (newGroupId) {
      subgroupsFilter.value = subgroups.value.filter(
        (s) => String(s.idgrupo) === String(newGroupId),
      )
      // reset subgroup if group changes
      if (!subgroupsFilter.value.find((s) => String(s.idsubgrupo) === filters.value.subgroupId)) {
        filters.value.subgroupId = ''
      }
    } else {
      subgroupsFilter.value = []
      filters.value.subgroupId = ''
    }
  },
  { immediate: true },
)

async function onSearch() {
  const f: FilterBOIndicador = {}
  // If nombre is numeric, treat as code. Otherwise send as name if backend supports it.
  const st = filters.value.nombre?.trim()
  if (filters.value.nombre) f.NOMBRE = st
  if (filters.value.groupId) f.IDGRUPO = Number(filters.value.groupId)
  if (filters.value.subgroupId) f.IDSUBGRUPO = Number(filters.value.subgroupId)
  if (filters.value.codigo) f.CODIGO = filters.value.codigo

  loading.value = true
  await getIndicators(f)
  loading.value = false
}

const onReset = async () => {
  filters.value = {
    nombre: '',
    codigo: '',
    groupId: '',
    subgroupId: '',
    unitMeasureId: '',
  }
}
</script>
