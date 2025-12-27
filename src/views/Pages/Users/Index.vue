<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6"></div>
  </AdminLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { useUser } from '@/composables/useUser'

const { loadUsers } = useUser()

const currentPageTitle = ref('Usuarios')

onMounted(async () => {
  await loadUsers()
})
</script>
