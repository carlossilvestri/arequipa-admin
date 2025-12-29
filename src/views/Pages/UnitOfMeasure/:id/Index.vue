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
                v-model="form.NOMBREUNIDADMEDIDA"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBREUNIDADMEDIDA"
                type="text"
              />
            </div>
            <div>
              <custom-input
                v-model="form.SIMBOLOUNIDADMEDIDA"
                placeholder="Símbolo"
                label="Símbolo"
                name="SIMBOLOUNIDADMEDIDA"
                type="text"
              />
            </div>

            <div>
              <custom-input
                v-model="form.DESCRIPCIONUNIDADMEDIDA"
                type="text"
                name="DESCRIPCIONUNIDADMEDIDA"
                label="Descripción"
                placeholder="Ingrese la descripción"
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
  type CreateBOUnidadMedidaRequest,
  type UpdateBOUnidadMedidaRequest,
} from '@/interfaces'
import { createUnitMeasure, getUnitMeasureById, updateUnitMeasure } from '@/services/unitMeasure'

const topic: string = 'Unidad de medida'
const mainPage: string = 'units-of-measure'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  NOMBREUNIDADMEDIDA: string().required(defaultErrorMsg).min(1).max(100),
  SIMBOLOUNIDADMEDIDA: string().required(defaultErrorMsg).min(1).max(100),
  DESCRIPCIONUNIDADMEDIDA: string().required(defaultErrorMsg).min(1).max(1000),
})

const form = ref({
  IDUNIDADMEDIDA: '',
  NOMBREUNIDADMEDIDA: '',
  SIMBOLOUNIDADMEDIDA: '',
  DESCRIPCIONUNIDADMEDIDA: '',
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
    form.value.IDUNIDADMEDIDA = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getUnitMeasureById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.NOMBREUNIDADMEDIDA = objectData.nombreunidadmedida
      form.value.SIMBOLOUNIDADMEDIDA = objectData.simbolounidadmedida
      form.value.DESCRIPCIONUNIDADMEDIDA = objectData.descripcionunidadmedida
    }
    status.value = 'update'
  } else {
    currentPageTitle.value = `Nueva ${topic}`
    resetForm()
    status.value = 'new'
  }
}

const save = async () => {
  loading.value = true
  const createUserData: CreateBOUnidadMedidaRequest = {
    NOMBREUNIDADMEDIDA: form.value.NOMBREUNIDADMEDIDA,
    SIMBOLOUNIDADMEDIDA: form.value.SIMBOLOUNIDADMEDIDA,
    DESCRIPCIONUNIDADMEDIDA: form.value.DESCRIPCIONUNIDADMEDIDA,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(createUserData)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateBOUnidadMedidaRequest = {
      ...createUserData,
      IDUNIDADMEDIDA: Number(route.params.id),
    }
    await handleUpdate(updateUserData)
  }
  router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateBOUnidadMedidaRequest) => {
  // TODO: Call your API to save the user here
  await createUnitMeasure(values)
}

const handleUpdate = async (values: UpdateBOUnidadMedidaRequest) => {
  await updateUnitMeasure(values)
}

function cancel() {
  router.back()
}
</script>
