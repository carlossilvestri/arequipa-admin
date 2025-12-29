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
                v-model="form.NOMBREGRUPO"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBREGRUPO"
                type="text"
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
  type CreateBOGrupoRequest,
  type UpdateBOGrupoRequest,
} from '@/interfaces'
import { createGroup, getGroupById, updateGroup } from '@/services/group'

const topic: string = 'Grupo'
const mainPage: string = 'groups'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  NOMBREGRUPO: string().required(defaultErrorMsg).min(1).max(100),
})

const form = ref({
  IDGRUPO: '',
  NOMBREGRUPO: '',
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
    form.value.IDGRUPO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getGroupById(Number(id))
    if (response?.objeto) {
      const objectData = response.objeto
      form.value.NOMBREGRUPO = objectData.nombregrupo
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
  const createUserData: CreateBOGrupoRequest = {
    NOMBREGRUPO: form.value.NOMBREGRUPO,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(createUserData)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateBOGrupoRequest = {
      ...createUserData,
      IDGRUPO: Number(route.params.id),
      EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
    }
    await handleUpdate(updateUserData)
  }
  router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateBOGrupoRequest) => {
  // TODO: Call your API to save the user here
  await createGroup(values)
}

const handleUpdate = async (values: UpdateBOGrupoRequest) => {
  await updateGroup(values)
}

function cancel() {
  router.back()
}
</script>
