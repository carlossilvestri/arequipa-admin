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
                v-model="form.NOMBRETERRITORIO"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBRETERRITORIO"
                type="text"
              />
            </div>
            <div>
              <custom-input name="IDTIPOTERRITORIO" v-model="form.IDTIPOTERRITORIO">
                <template #input="{ value, onInput }">
                  <SelectInput
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.territoryTypes"
                    label="Tipo Territorio"
                    placeholder="Seleccione un tipo territorio"
                  />
                </template>
              </custom-input>
            </div>
            <div>
              <custom-input name="IDTERRITORIOPADRE" v-model="form.IDTERRITORIOPADRE">
                <template #input="{ value, onInput }">
                  <SelectInput
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.territoryParents"
                    label="Territorio padre"
                    placeholder="Seleccione un territorio padre"
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
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { object, string } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'
import {
  EstadoPersistenciaEnum,
  type CreateBOTerritorioRequest,
  type UpdateBOTerritorioRequest,
  type BOTipoTerritorio,
  type BOTerritorio,
} from '@/interfaces'
import {
  createTerritory,
  getTerritiries,
  getTerritoryById,
  updateTerritory,
} from '@/services/territories'
import { getTerritoryTypes } from '@/services/territoryType'

const topic: string = 'Territorio'
const mainPage: string = 'territories'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const territoryTypes = ref<BOTipoTerritorio[]>([])
const territoryParents = ref<BOTerritorio[]>([])

const schema = object().shape({
  NOMBRETERRITORIO: string().required(defaultErrorMsg).min(1).max(150),
  IDTIPOTERRITORIO: string().required(defaultErrorMsg),
})

const form = ref({
  IDTERRITORIO: '',
  IDTERRITORIOPADRE: '',
  IDTIPOTERRITORIO: '',
  NOMBRETERRITORIO: '',
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(async () => {
  await handleOnMount()
})

const computedValues = computed(() => ({
  territoryTypes: territoryTypes.value.map((territoryType) => ({
    value: territoryType.idtipoterritorio.toString(),
    label: territoryType.nombretipoterritorio,
  })),
  territoryParents: territoryParents.value.map((territoryParent) => ({
    value: territoryParent.idterritorio.toString(),
    label: territoryParent.nombreterritorio,
  })),
}))

const handleOnMount = async () => {
  const id = route.params.id
  const result = await getTerritoryTypes({})
  territoryTypes.value = result ?? []

  const result2 = await getTerritiries({})
  territoryParents.value = result2 ?? []

  if (id && id !== 'new') {
    form.value.IDTERRITORIO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getTerritoryById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.IDTERRITORIOPADRE = objectData.idterritoriopadre.toString()
      form.value.IDTIPOTERRITORIO = objectData.idtipoterritorio.toString()
      form.value.NOMBRETERRITORIO = objectData.nombreterritorio
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
  const objectData: CreateBOTerritorioRequest = {
    IDTERRITORIO: +form.value.IDTERRITORIO,
    IDTIPOTERRITORIO: +form.value.IDTIPOTERRITORIO,
    IDTERRITORIOPADRE: +form.value.IDTERRITORIOPADRE,
    NOMBRETERRITORIO: form.value.NOMBRETERRITORIO,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(objectData)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateBOTerritorioRequest = {
      ...objectData,
      IDTERRITORIO: +route.params.id,
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateUserData)
  }
  router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateBOTerritorioRequest) => {
  await createTerritory(values)
}

const handleUpdate = async (values: UpdateBOTerritorioRequest) => {
  await updateTerritory(values)
}

function cancel() {
  router.back()
}
</script>
