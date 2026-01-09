<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Iniciar sesión
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Ingrese su nick y contraseña para iniciar sesión!
                </p>
              </div>
              <div>
                <div class="relative py-3 sm:py-5">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
                  </div>
                </div>
                <Form
                  :validation-schema="schema"
                  class="space-y-4 sm:space-y-5"
                  :initial-values="form"
                  @submit="handleSubmit"
                  autocomplete="off"
                >
                  <!-- Hidden dummy fields to absorb browser autofill -->
                  <input
                    type="text"
                    name="fake-username"
                    autocomplete="username"
                    class="hidden"
                    tabindex="-1"
                  />
                  <input
                    type="password"
                    name="fake-password"
                    autocomplete="new-password"
                    class="hidden"
                    tabindex="-1"
                  />
                  <div class="space-y-5">
                    <!-- nick -->
                    <div>
                      <custom-input
                        v-model="form.nick"
                        placeholder="Nick"
                        label="Nick"
                        name="nick"
                        type="text"
                      />
                    </div>
                    <!-- Password -->
                    <div>
                      <custom-input type="password" name="password" v-model="form.password">
                        <template #input="{ value, onBlur, onInput }">
                          <password-input @blur="onBlur" @input="onInput" :value="value" />
                        </template>
                      </custom-input>
                    </div>
                    <div v-if="error">
                      <Alert
                        variant="error"
                        title="Error"
                        message="Credenciales incorrectas"
                        :showLink="false"
                      />
                    </div>
                    <!-- Checkbox -->
                    <!--
                    <div class="flex items-center justify-between">
                      <div>
                        <label
                          for="keepLoggedIn"
                          class="flex items-center text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-gray-400"
                        >
                          <div class="relative">
                            <input
                              v-model="keepLoggedIn"
                              type="checkbox"
                              id="keepLoggedIn"
                              class="sr-only"
                            />
                            <div
                              :class="
                                keepLoggedIn
                                  ? 'border-brand-500 bg-brand-500'
                                  : 'bg-transparent border-gray-300 dark:border-gray-700'
                              "
                              class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                            >
                              <span :class="keepLoggedIn ? '' : 'opacity-0'">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                    stroke="white"
                                    stroke-width="1.94437"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                          Mantenerme conectado
                        </label>
                      </div>
                      <router-link
                        to="/reset-password"
                        class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >¿Olvidaste tu contraseña?</router-link
                      >
                    </div>
                    -->
                    <!-- Button -->
                    <div>
                      <Button
                        type="submit"
                        :loading="loading"
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                      >
                        Iniciar sesión
                      </Button>
                    </div>
                  </div>
                </Form>
                <!--
                <div class="mt-5">
                  <p
                    class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start"
                  >
                    ¿No tienes una cuenta?
                    <router-link
                      to="/signup"
                      class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >Registrarse</router-link
                    >
                  </p>
                </div>
                -->
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
        >
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <img
                  width="{231}"
                  height="{48}"
                  src="@/assets/img/logos/logo-ipe-arequipa.png"
                  alt="Logo"
                  class="invert-100 brightness-0"
                />
              </router-link>
              <p class="text-center text-gray-400 dark:text-white/60">
                "Nos comprometemos a promover el desarrollo tecnológico, económico y social de
                Arequipa."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { ref, onMounted } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import Button from '@/components/ui/Button.vue'
import Alert from '@/components/ui/Alert.vue'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import PasswordInput from '@/components/common/custom/PasswordInput.vue'
import { login } from '@/services/users'
import type { LoginRequest } from '@/interfaces'
import { routes } from '@/utilities/constants'
const loading = ref(false)
const router = useRouter()

const error = ref(false)
const form = ref({
  nick: '',
  password: '',
})
const keepLoggedIn = ref(false)

const schema = object().shape({
  nick: string().required('Valor requerido'),
  password: string().required('Valor requerido'),
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

onMounted(() => {
  handleOnMount()
})

const handleOnMount = async () => {
  console.log('handleOnMount')
  resetForm()
}

const handleSubmit = async (values: any) => {
  loading.value = true
  const loginRequest: LoginRequest = {
    nick: values.nick,
    password: values.password,
  }

  const response = await login(loginRequest)
  if (response.exito) {
    router.push(routes.admin.path)
  } else {
    error.value = true
  }
  loading.value = false
}
</script>
