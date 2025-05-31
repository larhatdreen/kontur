<script setup>
import { ref } from 'vue'

import Header from '@/components/Header.vue'
import BannerSlider from '@/components/BannerSlider.vue'
import LearnSection from '@/components/LearnSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import Gallery from '@/components/Gallery.vue'
import Map from '@/components/Map.vue'
import Footer from '@/components/Footer.vue'
import FormModal from '@/components/FormModal.vue'

const phone = '+74993489396'
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}
</script>

<template>
  <Header :phone="phone" />
  <BannerSlider :on-cta-click="openModal" />
  <LearnSection />
  <ProcessSection />
  <Gallery />
  <Map />
  <Footer :phone="phone" />
  <FormModal :is-open="isModalOpen" @close="isModalOpen = false" />
</template>

<style scoped>

</style>
