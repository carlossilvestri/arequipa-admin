<template>
  <div>
    <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div
            class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800"
          >
            <UserCircleIcon class="h-20 w-20" />
            <!--
            <img src="/images/user/owner.jpg" alt="user" />
            -->
          </div>
          <div class="order-3 xl:order-2">
            <h4
              class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left"
            >
              {{ userStore.loggedUser?.nombre }}
            </h4>
          </div>
        </div>
        <button @click="isProfileInfoModal = true" class="edit-button">
          <svg
            class="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Editar
        </button>
      </div>
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32 mt-3">
          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Nombre</p>
            <p class="text-sm font-medium text-gray-800 dark:text-white/90">
              {{ userStore.loggedUser?.nombre }}
            </p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Nick</p>
            <p class="text-sm font-medium text-gray-800 dark:text-white/90">
              {{ userStore.loggedUser?.nick }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="isProfileInfoModal" @close="isProfileInfoModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
          <!-- close btn -->
          <button
            @click="isProfileInfoModal = false"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar información personal
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza tus datos para mantener tu perfil actualizado.
            </p>
          </div>
          <Form
            :validation-schema="schema"
            class="flex flex-col"
            :initial-values="form"
            @submit="saveProfile"
          >
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div>
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Información personal
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <custom-input
                      v-model="form.NOMBRE"
                      type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      name="NOMBRE"
                      :value="userStore.loggedUser?.nombre"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <custom-input
                      v-model="form.NICK"
                      type="text"
                      :value="userStore.loggedUser?.nick"
                      name="NICK"
                      label="Nick"
                      placeholder="Nick"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
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
                </div>
              </div>
              <div class="mt-7">
                <h5 class="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Cambiar contraseña
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <custom-input type="password" name="CLAVE" v-model="form.CLAVE">
                      <template #input="{ value, onBlur, onInput }">
                        <password-input @blur="onBlur" @input="onInput" :value="value" />
                      </template>
                    </custom-input>
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <custom-input type="password" name="REPETIRCLAVE" v-model="form.REPETIRCLAVE">
                      <template #input="{ value, onBlur, onInput }">
                        <password-input @blur="onBlur" @input="onInput" :value="value" />
                      </template>
                    </custom-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                @click="isProfileInfoModal = false"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Cancelar
              </button>
              <Button
                type="submit"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Guardar cambios
              </Button>
            </div>
          </Form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as Yup from 'yup'
import { Form, useForm } from 'vee-validate'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import Modal from './Modal.vue'
import { UserCircleIcon } from '@/icons'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui/Button.vue'
import PasswordInput from '@/components/common/custom/PasswordInput.vue'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { EstadoPersistenciaEnum, type UpdateUserRequest } from '@/interfaces'
import { updateUser } from '@/services/users'

const isProfileInfoModal = ref(false)
const userStore = useUserStore()

const defaultErrorMsg = 'Valor requerido'
const schema = Yup.object().shape({
  NOMBRE: Yup.string().required(defaultErrorMsg).min(1),
  NICK: Yup.string().required(defaultErrorMsg).min(1),
  CLAVE: Yup.string().required(defaultErrorMsg).min(1),
  REPETIRCLAVE: Yup.string().when('CLAVE', (CLAVE, field) =>
    CLAVE
      ? field.required(defaultErrorMsg).oneOf([Yup.ref('CLAVE')], 'Las contraseñas no coinciden')
      : field,
  ),
  ESTADO: Yup.string().required(defaultErrorMsg),
})

const form = ref({
  IDUSUARIO: userStore.loggedUser?.idusuario,
  NOMBRE: userStore.loggedUser?.nombre,
  NICK: userStore.loggedUser?.nick,
  CLAVE: userStore.loggedUser?.clave,
  ESTADO: userStore.loggedUser?.estado,
  REPETIRCLAVE: userStore.loggedUser?.clave,
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

const saveProfile = async () => {
  // Implement save profile logic here
  const updateUserData: UpdateUserRequest = {
    IDUSUARIO: Number(form.value.IDUSUARIO),
    NOMBRE: form.value.NOMBRE!,
    NICK: form.value.NICK!,
    CLAVE: form.value.CLAVE!,
    ESTADO: form.value.ESTADO!,
    EstadoPersistencia: EstadoPersistenciaEnum.MODIFIED,
  }
  const response = await updateUser(updateUserData)
  if (response.exito) {
    userStore.saveLoggedUserOnStore(response.objeto)
  }
  isProfileInfoModal.value = false
}
</script>
