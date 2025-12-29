<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard :title="currentPageTitle">
        <Form
          :validation-schema="schema"
          class="space-y-4 sm:space-y-5"
          :initial-values="form"
          @submit="save"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <custom-input
                v-model="form.name"
                placeholder="Nombre"
                label="Nombre"
                name="name"
                type="text"
              />
            </div>
            <div>
              <SelectInput />
            </div>
            <div>
              <custom-input name="multipleSelect" label="Multiple Select">
                <template #input>
                  <!-- Multiple Select Input -->
                  <MultipleSelect v-model="form.selectedItems" :options="options" class="w-full" />
                </template>
              </custom-input>
            </div>
            <div>
              <custom-input
                v-model="form.quantity"
                placeholder="Valor numérico con decimales"
                label="Valor numérico con decimales"
                name="quantity"
                type="number"
              />
            </div>

            <div>
              <custom-input
                v-model="form.quantity2"
                placeholder="Valor numérico sin decimales"
                label="Valor numérico sin decimales"
                name="quantity2"
                type="number"
              />
            </div>
          </div>
          <div>
            <custom-input name="description" label="Descripción">
              <template #input>
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full rounded-lg border border-gray-200 bg-transparent px-3.5 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/3 dark:text-white/90"
                />
              </template>
            </custom-input>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <custom-input v-model="form.date" label="Fecha" name="date" type="date" />
            </div>
            <div>
              <custom-input v-model="form.time" label="Hora" name="time" type="time" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <Button variant="outline" @click="cancel">Cancelar</Button>
            <Button type="submit">Guardar</Button>
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
import { useNotificationStore } from '@/stores/notification'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import SelectInput from '@/components/forms/FormElements/SelectInput.vue'
import { object, string, number, array } from 'yup'
import CustomInput from '@/components/common/custom/CustomInput.vue'
import MultipleSelect from '@/components/forms/FormElements/MultipleSelect.vue'

const currentPageTitle = ref('Editar Unidades de Medida')
const route = useRoute()
const router = useRouter()
const notifications = useNotificationStore()
const schema = object().shape({
  name: string().required('Valor requerido').min(1),
  //description: string().required('Valor requerido'),
  //status: string().required('Valor requerido'),
  //quantity: number('El valor debe ser un número')
  //.transform((value) => (Number.isNaN(value) ? null : value))
  //.required('Valor requerido'),
  //quantity2: number('El valor debe ser un número'),
  //.transform((value) => (Number.isNaN(value) ? null : value))
  //.integer('El valor no debe tener decimales')
  //.required('Valor requerido'),
  //selectedItems: array().min(1, 'Valor requerido').required('Valor requerido'),
})

const form = ref({
  id: null,
  name: '',
  description: '',
  status: 'Active',
  quantity: null,
  quantity2: null,
  date: null,
  time: null,
  selectedItems: [],
})

const { resetForm } = useForm({
  initialValues: form.value, // Opcional: establece los valores iniciales
})

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'graphs', label: 'Graphs' },
]

onMounted(() => {
  const id = route.params.id
  form.value.id = id
  if (id && id !== 'new') {
    currentPageTitle.value = 'Editar unidades de Medida'
  } else {
    currentPageTitle.value = 'Nuevas unidades de Medida'
    resetForm()
  }
})

function save(values: any) {
  // ...persist your data here
  notifications.success('El registro fue grabado con éxito.')
  router.push('/units-of-measure')
}

function cancel() {
  router.back()
}

const submit = (values) => {
  // implement your logic here
  console.log(values)
}
</script>
