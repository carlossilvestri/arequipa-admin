<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard :title="currentPageTitle">
        <PulseLoading v-if="!status" />

        <Form
          :validation-schema="schema"
          class="space-y-4 sm:space-y-5"
          :initial-values="form"
          @submit="save"
          v-if="status"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <custom-input
                v-model="form.IDTIPOTERRITORIO"
                placeholder="ID"
                label="ID"
                name="IDTIPOTERRITORIO"
                type="text"
                disabled
              />
            </div>
            <div>
              <custom-input
                v-model="form.NOMBRETIPOTERRITORIO"
                placeholder="Nombre"
                label="Nombre*"
                name="NOMBRETIPOTERRITORIO"
                type="text"
              />
            </div>
            <div>
              <custom-input
                v-model="form.ORDENJERARQUICO"
                placeholder="Orden jerárquico"
                label="Orden jerárquico*"
                name="ORDENJERARQUICO"
                type="number"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <Button variant="outline" @click="cancel">Cancelar</Button>
            <Button type="submit" :loading="loading">Guardar</Button>
          </div>
        </Form>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import { object, string } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'
import {
  EstadoPersistenciaEnum,
  type CreateBOTipoTerritorioRequest,
  type UpdateBOTipoTerritorioRequest,
} from '@/interfaces'
import {
  createTerritoryType,
  getTerritoryTypeById,
  updateTerritoryType,
} from '@/services/territoryType'
import { routes } from '@/utilities/constants'

const topic: string = 'Tipo de territorio'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  NOMBRETIPOTERRITORIO: string().required(defaultErrorMsg).min(1).max(100),
  ORDENJERARQUICO: string()
    .required(defaultErrorMsg)
    .min(1)
    .test('is-positive', 'Debe ser un número positivo', (value) => {
      return value ? parseInt(value) > 0 : false
    }),
})

const form = ref({
  IDTIPOTERRITORIO: '0',
  NOMBRETIPOTERRITORIO: '',
  ORDENJERARQUICO: '0',
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(async () => {
  await handleOnMount()
})

const handleOnMount = async () => {
  const id = route.params.id
  if (id && id !== 'new') {
    form.value.IDTIPOTERRITORIO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getTerritoryTypeById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.NOMBRETIPOTERRITORIO = objectData.nombretipoterritorio
      form.value.ORDENJERARQUICO = String(objectData.ordenjerarquico)
    }
    status.value = 'update'
  } else {
    currentPageTitle.value = `Nuevo ${topic}`
    resetForm()
    status.value = 'new'
  }
}

const save = async () => {
  loading.value = true
  const objectData: CreateBOTipoTerritorioRequest = {
    NOMBRETIPOTERRITORIO: form.value.NOMBRETIPOTERRITORIO,
    ORDENJERARQUICO: +form.value.ORDENJERARQUICO,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    const response = await handleCreate(objectData)
    router.push(
      routes.admin.territoryTypes.edit.path.replace(
        ':id',
        response.objeto?.idtipoterritorio.toString() || '',
      ),
    )
    // Reload page to show the new indicator
    setTimeout(async () => {
      await handleOnMount()
    }, 500)
  } else {
    // TODO: Handle update logic
    const updateData: UpdateBOTipoTerritorioRequest = {
      ...objectData,
      IDTIPOTERRITORIO: +form.value.IDTIPOTERRITORIO,
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateData)
  }
  //router.push(routes.admin.territoryTypes.path)
  loading.value = false
}

const handleCreate = async (values: CreateBOTipoTerritorioRequest) => {
  // TODO: Call your API to save the user here
  const response = await createTerritoryType(values)
  return response
}

const handleUpdate = async (values: UpdateBOTipoTerritorioRequest) => {
  const response = await updateTerritoryType(values)
  return response
}

function cancel() {
  router.back()
}
</script>
