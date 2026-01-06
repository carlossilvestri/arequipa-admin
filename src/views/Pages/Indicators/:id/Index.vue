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
                v-model="form.IDINDICADOR"
                placeholder="ID"
                label="ID"
                name="IDINDICADOR"
                type="text"
                disabled
              />
            </div>
            <div>
              <custom-input
                v-model="form.CODIGOINDICADOR"
                placeholder="Código"
                label="Código"
                name="CODIGOINDICADOR"
                type="text"
              />
            </div>
            <div>
              <custom-input
                v-model="form.NOMBREINDICADOR"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBREINDICADOR"
                type="text"
              />
            </div>

            <div>
              <custom-input name="IDGRUPO" v-model="form.IDGRUPO">
                <template #input="{ value, onInput }">
                  <select-input
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.groupOptions"
                    label="Grupo"
                    placeholder="Seleccione un grupo"
                  />
                </template>
              </custom-input>
            </div>

            <div>
              <custom-input name="IDSUBGRUPO" v-model="form.IDSUBGRUPO">
                <template #input="{ value, onInput }">
                  <select-input
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.subgroupsFilter"
                    label="Subgrupo"
                    placeholder="Seleccione un subgrupo"
                  />
                </template>
              </custom-input>
            </div>

            <div>
              <custom-input name="IDUNIDADMEDIDA" v-model="form.IDUNIDADMEDIDA">
                <template #input="{ value, onInput }">
                  <select-input
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.unitMeasureOptions"
                    label="Unidad de medida"
                    placeholder="Seleccione una unidad de medida"
                  />
                </template>
              </custom-input>
            </div>
            <div class="flex items-center">
              <Checkbox
                name="PERMITECOMPARACION"
                :modelValue="form.PERMITECOMPARACION"
                @update:modelValue="form.PERMITECOMPARACION = $event"
                label="Permite comparación"
              />
            </div>
            <div class="flex items-center">
              <Checkbox
                name="ACTIVO"
                :modelValue="form.ACTIVO"
                @update:modelValue="form.ACTIVO = $event"
                label="Activo"
              />
            </div>

            <div>
              <custom-input
                v-model="form.DISPONIBILIDADREFERENCIAL"
                placeholder="Disponibilidad referencial"
                label="Disponibilidad referencial"
                name="DISPONIBILIDADREFERENCIAL"
                type="text"
              />
            </div>

            <div>
              <custom-input
                v-model="form.URLFUENTE"
                placeholder="URL de la fuente"
                label="URL de la fuente"
                name="URLFUENTE"
                type="text"
              />
            </div>
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-400 text-sm font-semibold"
              >Descripción</label
            >
            <div class="mt-2">
              <QuillEditor
                theme="snow"
                content-type="html"
                v-model:content="form.DESCRIPCIONINDICADOR"
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import { object, string, boolean } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'
import {
  EstadoPersistenciaEnum,
  type BOGrupo,
  type BOSubGrupo,
  type BOUnidadMedida,
  type CreateBOIndicadorRequest,
  type UpdateBOIndicadorRequest,
} from '@/interfaces'
import { createIndicator, getIndicatorById, updateIndicator } from '@/services/indicator'
import { getGroups } from '@/services/group'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { getSubgroups } from '@/services/subgroup'
import { getUnitMeasures } from '@/services/unitMeasure'
import Checkbox from '@/components/common/custom/Checkbox.vue'

const groups = ref<BOGrupo[]>([])
const subgroups = ref<BOSubGrupo[]>([])
const subgroupsFilter = ref<BOSubGrupo[]>([])
const unitMeasures = ref<BOUnidadMedida[]>([])
const topic: string = 'Indicador'
const mainPage: string = 'indicators'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  CODIGOINDICADOR: string().required(defaultErrorMsg).min(1).max(20),
  IDGRUPO: string().required(defaultErrorMsg),
  NOMBREINDICADOR: string().required(defaultErrorMsg).min(1).max(200),
  URLFUENTE: string().max(500),
  DISPONIBILIDADREFERENCIAL: string().max(150),
  IDUNIDADMEDIDA: string().required(defaultErrorMsg),
  PERMITECOMPARACION: boolean(),
  ACTIVO: boolean(),
})

const form = ref({
  IDINDICADOR: '0',
  CODIGOINDICADOR: '',
  NOMBREINDICADOR: '',
  DESCRIPCIONINDICADOR: '',
  IDGRUPO: '',
  IDSUBGRUPO: '',
  IDUNIDADMEDIDA: '',
  PERMITECOMPARACION: false,
  DISPONIBILIDADREFERENCIAL: '',
  URLFUENTE: '',
  ACTIVO: false,
})

const computedValues = computed(() => ({
  groupOptions: groups.value.map((group) => ({
    value: group.idgrupo.toString(),
    label: group.nombregrupo,
  })),
  subgroupOptions: subgroups.value.map((subgroup) => ({
    value: subgroup.idsubgrupo.toString(),
    label: subgroup.nombresubgrupo,
  })),
  unitMeasureOptions: unitMeasures.value.map((unitMeasure) => ({
    value: unitMeasure.idunidadmedida.toString(),
    label: unitMeasure.nombreunidadmedida,
  })),
  idGroup: form.value.IDGRUPO,
  subgroupsFilter: subgroupsFilter.value.map((subgroup) => ({
    value: subgroup.idsubgrupo.toString(),
    label: subgroup.nombresubgrupo,
  })),
}))

watch([() => computedValues.value.idGroup, () => subgroups.value], ([newGroupId]) => {
  if (newGroupId) {
    subgroupsFilter.value = subgroups.value.filter((subgroup) => subgroup.idgrupo === +newGroupId)
    form.value.IDSUBGRUPO = ''
  } else {
    subgroupsFilter.value = []
  }
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(async () => {
  await handleOnMount()
})

const handleLoadThirdPartyData = async () => {
  const [result, result2, result3] = await Promise.all([
    getGroups({}),
    getSubgroups({}),
    getUnitMeasures({}),
  ])
  groups.value = result ?? []
  subgroups.value = result2 ?? []
  unitMeasures.value = result3 ?? []
  unitMeasures.value = result3 ?? []
}

const handleOnMount = async () => {
  const id = route.params.id
  await handleLoadThirdPartyData()
  if (id && id !== 'new') {
    form.value.IDINDICADOR = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getIndicatorById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.NOMBREINDICADOR = objectData.nombreindicador
      form.value.IDGRUPO = objectData.idgrupo.toString()
      form.value.IDSUBGRUPO = objectData.idsubgrupo.toString()
      form.value.CODIGOINDICADOR = objectData.codigoindicador
      form.value.DESCRIPCIONINDICADOR = objectData.descripcionindicador
      form.value.IDUNIDADMEDIDA = objectData.idunidadmedida.toString()
      form.value.PERMITECOMPARACION = objectData.permitecomparacion
      form.value.DISPONIBILIDADREFERENCIAL = objectData.disponibilidadreferencial
      form.value.URLFUENTE = objectData.urlfuente
      form.value.ACTIVO = objectData.activo
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
  const createUserData: CreateBOIndicadorRequest = {
    NOMBREINDICADOR: form.value.NOMBREINDICADOR,
    IDGRUPO: +form.value.IDGRUPO,
    IDSUBGRUPO: +form.value.IDSUBGRUPO,
    CODIGOINDICADOR: form.value.CODIGOINDICADOR,
    DESCRIPCIONINDICADOR: form.value.DESCRIPCIONINDICADOR,
    IDUNIDADMEDIDA: +form.value.IDUNIDADMEDIDA,
    URLFUENTE: form.value.URLFUENTE,
    ACTIVO: form.value.ACTIVO,
    PERMITECOMPARACION: form.value.PERMITECOMPARACION,
    DISPONIBILIDADREFERENCIAL: form.value.DISPONIBILIDADREFERENCIAL,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    const response = await handleCreate(createUserData)
    router.push(`/${mainPage}/${response.objeto?.idindicador}`)
    // Reload page to show the new indicator
    setTimeout(async () => {
      await handleOnMount()
    }, 1000)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateBOIndicadorRequest = {
      ...createUserData,
      IDINDICADOR: Number(route.params.id),
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateUserData)
  }
  //router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateBOIndicadorRequest) => {
  // TODO: Call your API to save the user here
  const response = await createIndicator(values)
  return response
}

const handleUpdate = async (values: UpdateBOIndicadorRequest) => {
  const response = await updateIndicator(values)
  return response
}

function cancel() {
  router.back()
}
</script>
