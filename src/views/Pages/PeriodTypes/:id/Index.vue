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
                v-model="form.NOMBRETIPOPERIODO"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBRETIPOPERIODO"
                type="text"
              />
            </div>
            <div>
              <custom-input
                v-model="form.CANTIDADMESES"
                placeholder="Cantidad de meses"
                label="Cantidad de meses"
                name="CANTIDADMESES"
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
  type CreateBOTipoPeriodoRequest,
  type UpdateBOTipoPeriodoRequest,
} from '@/interfaces'
import { createPeriodType, getPeriodTypeById, updatePeriodType } from '@/services/periodType'
import { routes } from '@/utilities/constants'

const topic: string = 'Tipo de período'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  NOMBRETIPOPERIODO: string().required(defaultErrorMsg).min(1).max(100),
  CANTIDADMESES: string()
    .required(defaultErrorMsg)
    .min(1)
    .test('is-positive', 'Debe ser un número positivo', (value) => {
      return value ? parseInt(value) > 0 : false
    }),
})

const form = ref({
  IDTIPOPERIODO: '',
  NOMBRETIPOPERIODO: '',
  CANTIDADMESES: '0',
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
    form.value.IDTIPOPERIODO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getPeriodTypeById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.NOMBRETIPOPERIODO = objectData.nombretipoperiodo
      form.value.CANTIDADMESES = String(objectData.cantidadmeses)
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
  const objectData: CreateBOTipoPeriodoRequest = {
    NOMBRETIPOPERIODO: form.value.NOMBRETIPOPERIODO,
    CANTIDADMESES: +form.value.CANTIDADMESES,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(objectData)
  } else {
    // TODO: Handle update logic
    const updateData: UpdateBOTipoPeriodoRequest = {
      ...objectData,
      IDTIPOPERIODO: +form.value.IDTIPOPERIODO,
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateData)
  }
  router.push(routes.admin.periodTypes.path)
  loading.value = false
}

const handleCreate = async (values: CreateBOTipoPeriodoRequest) => {
  // TODO: Call your API to save the user here
  await createPeriodType(values)
}

const handleUpdate = async (values: UpdateBOTipoPeriodoRequest) => {
  await updatePeriodType(values)
}

function cancel() {
  router.back()
}
</script>
