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
                v-model="form.NOMBRE"
                placeholder="Nombre"
                label="Nombre"
                name="NOMBRE"
                type="text"
              />
            </div>
            <div>
              <SelectInput
                v-model="form.ESTADO"
                :options="[
                  { value: 'ACTIVO', label: 'ACTIVO' },
                  { value: 'INACTIVO', label: 'INACTIVO' },
                ]"
                label="Estado"
                placeholder="Seleccione un estado"
              />
            </div>
            <div>
              <custom-input
                v-model="form.NICK"
                placeholder="Nick"
                label="Nick"
                name="NICK"
                type="text"
              />
            </div>

            <div>
              <custom-input type="password" name="CLAVE" v-model="form.CLAVE">
                <template #input="{ value, onBlur, onInput }">
                  <password-input @blur="onBlur" @input="onInput" :value="value" />
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { object, string } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PulseLoading from '@/components/loading/PulseLoading.vue'
import PasswordInput from '@/components/common/custom/PasswordInput.vue'
import { getUserById, updateUser } from '@/services/users'
import {
  EstadoPersistenciaEnum,
  type CreateUserRequest,
  type UpdateUserRequest,
} from '@/interfaces'
import { createUser } from '@/services/users'

const topic: string = 'Usuario'
const mainPage: string = 'users'
const currentPageTitle = ref(`Editar ${topic}`)
const status = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const defaultErrorMsg = 'Valor requerido'
const schema = object().shape({
  NOMBRE: string().required(defaultErrorMsg).min(1),
  NICK: string().required(defaultErrorMsg).min(1),
  CLAVE: string().required(defaultErrorMsg).min(1),
  ESTADO: string().required(defaultErrorMsg),
})

const form = ref({
  IDUSUARIO: '',
  NOMBRE: '',
  NICK: '',
  CLAVE: '',
  ESTADO: 'ACTIVO',
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
    form.value.IDUSUARIO = id as string
    currentPageTitle.value = `Editar ${topic}`
    const response = await getUserById(Number(id))
    if (response?.objeto) {
      const user = response.objeto
      form.value.NOMBRE = user.nombre
      form.value.NICK = user.nick
      form.value.ESTADO = user.estado
      form.value.CLAVE = user.clave || 'CAMBIAR CONTRASEÑA'
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
  const createUserData: CreateUserRequest = {
    NOMBRE: form.value.NOMBRE,
    NICK: form.value.NICK,
    CLAVE: form.value.CLAVE,
    ESTADO: form.value.ESTADO,
    EstadoPersistencia: EstadoPersistenciaEnum.NEW,
  }
  if (status.value === 'new') {
    await handleCreate(createUserData)
  } else {
    // TODO: Handle update logic
    const updateUserData: UpdateUserRequest = {
      ...createUserData,
      IDUSUARIO: Number(route.params.id),
    }
    await handleUpdate(updateUserData)
  }
  router.push(`/${mainPage}`)
  loading.value = false
}

const handleCreate = async (values: CreateUserRequest) => {
  // TODO: Call your API to save the user here
  await createUser(values)
}

const handleUpdate = async (values: UpdateUserRequest) => {
  await updateUser(values)
}

function cancel() {
  router.back()
}
</script>
