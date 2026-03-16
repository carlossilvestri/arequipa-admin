<template>
  <div class="min-h-screen bg-white">
    <div class="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="
          background-image: url('https://images.unsplash.com/photo-1648959855742-9184cee7b427?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwY2l0eSUyMG1vdW50YWluJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MzQ0NTExNXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral');
        "
      >
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75"></div>
        <div class="absolute inset-0 opacity-10">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
            <polyline
              points="0,300 100,280 200,320 300,260 400,290 500,240 600,270 700,220 800,250 900,200 1000,230 1100,180 1200,210"
              fill="none"
              stroke="white"
              stroke-width="2"
            ></polyline>
          </svg>
        </div>
      </div>
      <div
        class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl my-2 md:my-0"
      >
        <div id="brxe-fgeduv" class="flex justify-center my-3">
          <a
            id="brxe-htskvk"
            class="brxe-image logo-header tag"
            href="https://ipearequipa.org/"
            aria-current="page"
            ><img
              src="@/assets/img/logos/logo-ipe-arequipa.png"
              class="css-filter img-logo-custom"
              alt=""
              decoding="async"
              fetchpriority="high"
              data-type="string"
          /></a>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Explora y compara los indicadores de la gestión pública en Arequipa
        </h1>
        <p class="text-lg sm:text-xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed">
          Plataforma de acceso libre que reúne información oficial sobre economía, inversión
          pública, educación, salud y otros sectores para evaluar el desempeño de la gestión pública
          regional.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            data-slot="button"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[&gt;svg]:px-4 bg-white text-blue-900 hover:bg-blue-50 font-semibold text-lg px-8 py-6 rounded-lg shadow-xl"
            @click="handleScrollToSection('#opcion-1')"
          >
            Explorar indicadores</button
          ><button
            data-slot="button"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 has-[&gt;svg]:px-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-lg"
            @click="handleScrollToSection('#como-funciona')"
          >
            ¿Cómo funciona la plataforma?
          </button>
        </div>
      </div>
    </div>
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center text-blue-900 mb-16">
          ¿Qué puedes hacer en esta plataforma?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chart-column w-8 h-8 text-blue-600"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                <path d="M18 17V9"></path>
                <path d="M13 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-blue-900 mb-3">Analizar indicadores</h3>
            <p class="text-gray-600 leading-relaxed">
              Explora indicadores clave sobre economía, inversión pública, educación, salud y otros
              sectores.
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-git-compare w-8 h-8 text-blue-600"
              >
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-blue-900 mb-3">Comparar información</h3>
            <p class="text-gray-600 leading-relaxed">
              Compara indicadores entre distintos territorios y periodos para analizar tendencias.
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-check w-8 h-8 text-blue-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-blue-900 mb-3">Evaluar la gestión pública</h3>
            <p class="text-gray-600 leading-relaxed">
              Accede a información sistematizada que permite evaluar el desempeño de la gestión
              regional.
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chart-pie w-8 h-8 text-blue-600"
              >
                <path
                  d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
                ></path>
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-blue-900 mb-3">Visualizar datos fácilmente</h3>
            <p class="text-gray-600 leading-relaxed">
              Genera gráficos claros e interactivos para facilitar la interpretación de los datos.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10 md:py-20 bg-white" id="como-funciona">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-blue-900 mb-4">Cómo usar la plataforma</h2>
          <p class="text-xl text-gray-600">
            Sigue estos pasos para explorar y comparar indicadores.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div class="relative">
            <div
              class="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 -z-10"
            ></div>
            <div class="text-center">
              <div
                class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-6 shadow-lg"
              >
                <div
                  class="absolute inset-0 bg-blue-600 rounded-full animate-pulse opacity-50"
                ></div>
                <span class="relative text-3xl font-bold">1</span>
              </div>
              <h3 class="text-xl font-semibold text-blue-900 mb-3">Busca indicadores</h3>
              <p class="text-gray-600 leading-relaxed">
                Haz clic en "Buscar indicadores" para encontrarlos por sector, grupo o nombre.
              </p>
            </div>
          </div>
          <div class="relative">
            <div
              class="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 -z-10"
            ></div>
            <div class="text-center">
              <div
                class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-6 shadow-lg"
              >
                <div
                  class="absolute inset-0 bg-blue-600 rounded-full animate-pulse opacity-50"
                ></div>
                <span class="relative text-3xl font-bold">2</span>
              </div>
              <h3 class="text-xl font-semibold text-blue-900 mb-3">Configura la visualización</h3>
              <p class="text-gray-600 leading-relaxed">
                Selecciona el territorio, el tipo de gráfico y el periodo de tiempo.
              </p>
            </div>
          </div>
          <div class="relative">
            <div
              class="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200 -z-10"
            ></div>
            <div class="text-center">
              <div
                class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-6 shadow-lg"
              >
                <div
                  class="absolute inset-0 bg-blue-600 rounded-full animate-pulse opacity-50"
                ></div>
                <span class="relative text-3xl font-bold">3</span>
              </div>
              <h3 class="text-xl font-semibold text-blue-900 mb-3">Genera el gráfico</h3>
              <p class="text-gray-600 leading-relaxed">
                Presiona "Generar gráfico" para visualizar los datos.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="text-center">
              <div
                class="relative inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-6 shadow-lg"
              >
                <div
                  class="absolute inset-0 bg-blue-600 rounded-full animate-pulse opacity-50"
                ></div>
                <span class="relative text-3xl font-bold">4</span>
              </div>
              <h3 class="text-xl font-semibold text-blue-900 mb-3">Compara indicadores</h3>
              <p class="text-gray-600 leading-relaxed">
                Puedes añadir varios indicadores para compararlos en una misma gráfica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { handleScrollToSection } from '@/utilities'
import HeaderLogo from '@/components/layout/header/HeaderLogo.vue'
let ticking = false

// Mobile menu state
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const updateHeaderClass = () => {
  const header = document.getElementById('brx-header')
  if (!header) return
  const y = window.scrollY || window.pageYOffset
  if (y > 0) {
    header.classList.add('scrolling')
  } else {
    header.classList.remove('scrolling')
  }
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateHeaderClass()
    ticking = false
  })
}

onMounted(() => {
  updateHeaderClass()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
.img-logo-custom {
  filter: brightness(0) invert(1);
  width: 350px;
  @media (max-width: 768px) {
    width: 250px;
  }
}
</style>
