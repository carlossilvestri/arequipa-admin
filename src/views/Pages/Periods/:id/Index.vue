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
                v-model="form.IDPERIODO"
                placeholder="ID"
                label="ID"
                name="IDPERIODO"
                type="text"
                disabled
              />
            </div>
            <div>
              <custom-input
                v-model="form.ANIO"
                placeholder="Año*"
                label="Año"
                name="ANIO"
                type="number"
              />
            </div>
            <div>
              <custom-input
                v-model="form.NUMEROPERIODO"
                placeholder="Número de período"
                label="Número de período*"
                name="NUMEROPERIODO"
                type="number"
              />
            </div>
            <div>
              <custom-input
                v-model="form.ETIQUETACORTA"
                placeholder="Etiqueta corta"
                label="Etiqueta corta*"
                name="ETIQUETACORTA"
                type="text"
              />
            </div>
            <div>
              <custom-input
                v-model="form.ETIQUETALARGA"
                placeholder="Etiqueta larga"
                label="Etiqueta larga*"
                name="ETIQUETALARGA"
                type="text"
              />
            </div>
            <div>
              <custom-input name="IDTIPOPERIODO" v-model="form.IDTIPOPERIODO">
                <template #input="{ value, onInput }">
                  <SelectInput
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.periodTypes"
                    label="Tipo de período*"
                    id="IDTIPOPERIODO"
                    placeholder="Seleccione un tipo de período"
                  />
                </template>
              </custom-input>
            </div>
            <div>
              <custom-input name="FECHAINICIO" v-model="form.FECHAINICIO">
                <template #input="{ value, onInput, onBlur }">
                  <DatePicker
                    :label="'Fecha inicio*'"
                    :model-value="value"
                    :format="'yyyy-MM-dd'"
                    :model-type="'string'"
                    @update:model-value="(v) => onInput(String(v) as any)"
                    @blur="onBlur"
                  />
                </template>
              </custom-input>
            </div>
            <div>
              <custom-input name="FECHAFIN" v-model="form.FECHAFIN">
                <template #input="{ value, onInput, onBlur }">
                  <DatePicker
                    :label="'Fecha fin*'"
                    :model-value="value"
                    :format="'yyyy-MM-dd'"
                    :model-type="'string'"
                    @update:model-value="(v) => onInput(String(v) as any)"
                    @blur="onBlur"
                  />
                </template>
              </custom-input>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import { object, string, number } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'
import {
  EstadoPersistenciaEnum,
  type BOTipoPeriodo,
  type CreateBOPeriodoRequest,
  type UpdateBOPeriodoRequest,
} from '@/interfaces'
import { createPeriod, getPeriodById, updatePeriod } from '@/services/period'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import DatePicker from '@/components/forms/FormElements/DatePicker.vue'
import { getPeriodTypes } from '@/services/periodType'
import { routes } from '@/utilities/constants'

const periodTypes = ref<BOTipoPeriodo[]>([])
const topic: string = 'Período'
const currentPageTitle = ref(`Editar ${topic}`)
const presentYear = new Date().getFullYear()
const MIN_YEAR = 1900
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  ANIO: number()
    .typeError('That does not look like a year') // Message if the cast fails
    .nullable() // Allow null or undefined
    .transform((value, originalValue) => {
      // If original input is an empty string, transform to null before validation
      return originalValue === '' ? null : value
    })
    .required('El año es requerido')
    .integer('El año debe ser un número entero')
    .min(MIN_YEAR, `El año debe ser al menos ${MIN_YEAR}`)
    .max(presentYear, `El año no puede estar en el futuro (máx ${presentYear})`)
    .label('Año'),
  NUMEROPERIODO: string()
    .required(defaultErrorMsg)
    .min(1)
    .test('is-positive', 'Debe ser un número positivo', (value) => {
      return value ? parseInt(value) > 0 : false
    }),
  IDTIPOPERIODO: string().required(defaultErrorMsg),
  ETIQUETACORTA: string().required(defaultErrorMsg).min(1).max(150),
  ETIQUETALARGA: string().required(defaultErrorMsg).min(1).max(250),
  FECHAINICIO: string().required(defaultErrorMsg),
  FECHAFIN: string().required(defaultErrorMsg),
})

const form = ref({
  IDPERIODO: '0',
  IDTIPOPERIODO: '',
  ANIO: '',
  NUMEROPERIODO: '',
  ETIQUETACORTA: '',
  ETIQUETALARGA: '',
  FECHAINICIO: '',
  FECHAFIN: '',
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(async () => {
  await handleOnMount()
})

const computedValues = computed(() => ({
  periodTypes: periodTypes.value.map((periodType) => ({
    value: periodType.idtipoperiodo.toString(),
    label: periodType.nombretipoperiodo,
  })),
}))

const handleOnMount = async () => {
  const id = route.params.id
  const result = await getPeriodTypes({})
  periodTypes.value = result ?? []
  if (id && id !== 'new') {
    form.value.IDPERIODO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getPeriodById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.IDTIPOPERIODO = String(objectData.idtipoperiodo)
      form.value.ANIO = String(objectData.anio)
      form.value.NUMEROPERIODO = String(objectData.numeroperiodo)
      form.value.ETIQUETACORTA = objectData.etiquetacorta
      form.value.ETIQUETALARGA = objectData.etiquetalarga
      form.value.FECHAINICIO = objectData.fechainicio
      form.value.FECHAFIN = objectData.fechafin
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
  const objectData: CreateBOPeriodoRequest = {
    IDTIPOPERIODO: +form.value.IDTIPOPERIODO,
    ANIO: +form.value.ANIO,
    NUMEROPERIODO: +form.value.NUMEROPERIODO,
    ETIQUETACORTA: form.value.ETIQUETACORTA,
    ETIQUETALARGA: form.value.ETIQUETALARGA,
    FECHAINICIO: String(form.value.FECHAINICIO),
    FECHAFIN: String(form.value.FECHAFIN),
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    const response = await handleCreate(objectData)
    router.push(
      routes.admin.periods.edit.path.replace(':id', response.objeto?.idperiodo.toString() || ''),
    )
    // Reload page to show the new indicator
    setTimeout(async () => {
      await handleOnMount()
    }, 500)
  } else {
    // TODO: Handle update logic
    const updateData: UpdateBOPeriodoRequest = {
      ...objectData,
      IDPERIODO: +form.value.IDPERIODO,
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateData)
  }
  //router.push(routes.admin.periods.path)
  loading.value = false
}

const handleCreate = async (values: CreateBOPeriodoRequest) => {
  // TODO: Call your API to save the user here
  const response = await createPeriod(values)
  return response
}

const handleUpdate = async (values: UpdateBOPeriodoRequest) => {
  const response = await updatePeriod(values)
  return response
}

function cancel() {
  router.back()
}
</script>
