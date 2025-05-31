<script setup>
import { nextTick } from 'vue'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

// Импорт изображений
const images = import.meta.glob('@/assets/galleryImg*.webp', {
  eager: true,
  import: 'default',
  query: '?url'
})

// Сортировка по числу в названии
const sortedImages = Object.entries(images)
  .sort(([a], [b]) => {
    const getNumber = (str) => Number(str.match(/galleryImg(\d+)/)?.[1] || 0)
    return getNumber(a) - getNumber(b)
  })
  .map(([, url]) => url)

// Открытие full-screen галереи
const openViewer = async (index) => {
  await nextTick()
  Fancybox.show(
    sortedImages.map(src => ({ src, type: 'image' })),
    { startIndex: index }
  )
}
</script>

<template>
  <section class="galleryGrid">
    <div class="bigImg" @click="openViewer(0)">
      <img :src="sortedImages[0]" alt="Gallery image 1" />
    </div>

    <div class="smallImgs">
      <div
        v-for="(img, i) in sortedImages.slice(1)"
        :key="i"
        class="smallImg"
        @click="openViewer(i + 1)"
      >
        <img :src="img" :alt="`Gallery image ${i + 2}`" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.galleryGrid {
  display: grid;
  padding-top: 60px;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding-top: 24px;
  }
}

.bigImg {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.smallImgs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    gap: 10px;
  }
}

.smallImg {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
