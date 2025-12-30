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
                v-model="form.NOMBRESUBGRUPO"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBRESUBGRUPO"
                type="text"
              />
            </div>
            <div>
              <custom-input name="IDGRUPO" v-model="form.IDGRUPO">
                <template #input="{ value, onBlur, onInput }">
                  <SelectInput
                    :model-value="value"
                    @update:model-value="onInput"
                    :options="computedValues.groups"
                    label="Grupo"
                    placeholder="Seleccione un grupo"
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
  type CreateBOSubGrupoRequest,
  type UpdateBOSubGrupoRequest,
  type BOGrupo,
} from '@/interfaces'
import { createSubGroup, getSubGroupById, updateSubGroup } from '@/services/subgroup'
import { getGroups } from '@/services/group'

const topic: string = 'Subgrupo'
const mainPage: string = 'subgroups'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const groups = ref<BOGrupo[]>([])

const schema = object().shape({
  NOMBRESUBGRUPO: string().required(defaultErrorMsg).min(1).max(100),
  IDGRUPO: string().required(defaultErrorMsg),
})

const form = ref({
  IDSUBGRUPO: '',
  IDGRUPO: '',
  NOMBRESUBGRUPO: '',
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(async () => {
  await handleOnMount()
})

const computedValues = computed(() => ({
  groups: groups.value.map((group) => ({
    value: group.idgrupo.toString(),
    label: group.nombregrupo,
  })),
}))

const handleOnMount = async () => {
  const id = route.params.id
  const result = await getGroups({})
  groups.value = result ?? []

  if (id && id !== 'new') {
    form.value.IDSUBGRUPO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getSubGroupById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.IDGRUPO = objectData.idgrupo.toString()
      form.value.NOMBRESUBGRUPO = objectData.nombresubgrupo
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
  const objectData: CreateBOSubGrupoRequest = {
    IDGRUPO: +form.value.IDGRUPO,
    NOMBRESUBGRUPO: form.value.NOMBRESUBGRUPO,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(objectData)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateBOSubGrupoRequest = {
      ...objectData,
      IDSUBGRUPO: +route.params.id,
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateUserData)
  }
  router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateBOSubGrupoRequest) => {
  // TODO: Call your API to save the user here
  await createSubGroup(values)
}

const handleUpdate = async (values: UpdateBOSubGrupoRequest) => {
  await updateSubGroup(values)
}

function cancel() {
  router.back()
}
</script>
