<script setup>
import { onMounted } from 'vue'

const address = 'Новосибирск, Депутатская, 46'
const apiKey = '24873301-b73c-45c5-b25a-29708e2e4de5'

function loadYandexMap() {
  return new Promise((resolve) => {
    if (window.ymaps) return resolve()
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`
    script.onload = resolve
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  await loadYandexMap()

  ymaps.ready(() => {
    const map = new ymaps.Map('yandex-map', {
      center: [55.028894, 82.926493],
      zoom: 14,
      controls: [],
    }, {
      suppressMapOpenBlock: true,
    })

    map.behaviors.disable(['scrollZoom', 'drag', 'dblClickZoom', 'multiTouch'])

    ymaps.geocode(address).then((res) => {
      const geoObject = res.geoObjects.get(0)
      map.geoObjects.add(geoObject)
      map.setBounds(geoObject.properties.get('boundedBy'), { checkZoomRange: true })
    })
  })
})
</script>

<template>
  <div id="yandex-map" class="map" />
</template>

<style lang="scss" scoped>
.map {
    width: 100%;
    margin-top: 60px;
    height: 423px;
    border-radius: 30px;
    overflow: hidden;
}

@media screen and (max-width: 1024px) {
  .map {
    margin-top: 24px;
    height: 415px;
  }
}
</style>
