<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import img1 from '@/assets/slideImg1.svg'
import img2 from '@/assets/slideImg2.svg'
import img3 from '@/assets/slideImg3.svg'
import cta from '@/assets/arrowCTA.svg'
import slideBg from '@/assets/slideBg.svg'
import arrowRight from '@/assets/arrowRight.svg'
import arrowLeft from '@/assets/arrowLeft.svg'

defineProps({
    onCtaClick: Function
})

const swiperRef = ref(null)
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value <= 1024)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const slideNext = () => swiperRef.value?.slideNext()
const slidePrev = () => swiperRef.value?.slidePrev()
const onSwiper = swiper => (swiperRef.value = swiper)

const sliderContent = [
    {
        title: 'Школа <span class="orange">{</span><span class="highlight">программирования</span><span class="orange">}</span> для тех, кому нужны реальные навыки, а не просто сертификат',
        text: 'Закажите звонок, и наш специалист свяжется с вами в ближайшее время',
        textMobile: 'Пройдите тестирование, чтобы получить доступ к бесплатным вводным урокам',
        slideImg: img1
    },
    {
        title: 'Обучение через практику',
        text: 'Всё, что вы узнали, вы тут же начинаете применять на практике. Вы сразу видите результаты своего труда.',
        slideImg: img2
    },
    {
        title: 'Весь материал разбит на небольшие уроки',
        text: 'Теория и практика подаются маленькими порциями. Так вам будет легче усваивать новые знания.',
        slideImg: img3
    },
]
</script>

<template>
    <div class="sliderWrapper">
      <button v-if="!isMobile" class="leftSwiperBtn" @click="slidePrev">
        <img :src="arrowLeft" alt="Прошлый слайд" />
      </button>
      <Swiper
        v-if="!isMobile"
        :slides-per-view="1"
        :space-between="20"
        centered-slides
        loop
        class="swiper"
        @swiper="onSwiper"
      >
        <img :src="slideBg" class="bgImg" alt="Фоновая картинка слайдера">
        <SwiperSlide
          v-for="(slide, i) in sliderContent"
          :key="i"
          class="swiperSlide"
        >
          <div class="slideContent">
            <div class="wrapper">
              <div class="textWrapper">
                <h1 v-html="slide.title"></h1>
                <div class="devider"></div>
                <p>{{ slide.text }}</p>
              </div>
              <button class="ctaBtn" @click="onCtaClick">
                Заказать звонок
                <img :src="cta" alt="Заказать звонок" class="cta" />
              </button>
            </div>
            <div class="imagesContainer">
              <img :src="slide.slideImg" alt="Картинка для слайдера" class="slideImg" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
  
      <div v-else class="swiperSlide">
        <div class="slideContent">
            <div class="maskBg">
                <img :src="slideBg" class="bgImgMobile" alt="Фоновая картинка слайдера">
          <div class="wrapper">
            <div class="textWrapper">
              <h1 v-html="sliderContent[0].title"></h1>
              <div class="devider"></div>
              <p>{{ sliderContent[0].textMobile }}</p>
            </div>
            <button class="ctaBtn" @click="onCtaClick">
              Заказать звонок
              <img :src="cta" alt="Заказать звонок" class="cta" />
            </button>
          </div>
          <div class="imagesContainer">
            <img :src="sliderContent[0].slideImg" alt="Картинка для слайдера" class="slideImg" />
          </div>
        </div>
      </div>
    </div>
    <button v-if="!isMobile" class="rightSwiperBtn" @click="slideNext">
        <img :src="arrowRight" alt="Следующий слайд" />
      </button>
    </div>
  </template>
  



<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.sliderWrapper {
    position: relative;
}

.swiper {
    width: 100%;
    background: #fff;
    border-radius: 48px;
    margin-top: 23px;
    position: relative;
}

.swiperSlide {
    place-items: center;
    background-position: 0% 54%;
    background-repeat: no-repeat;
}

.slideContent {
    height: 481px;
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    position: relative;
    z-index: 1;
}

.imagesContainer {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
}

.slideImg {
    position: relative;
    z-index: 1;
}

.slideBg {
    position: absolute;
    right: -263%;
    top: -266%;
}

.textWrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;

    h1 {
        max-width: 650px;
    }

    .devider {
        width: 365.22px;
        height: 1px;
        background: rgba(222, 222, 222, 1);
    }

    p {
        font-size: $font-size-m;
        max-width: 365.22px;
        line-height: 23px;
    }
}

::v-deep(.orange) {
    color: $accent-color;
    font-weight: 400;
}

::v-deep(.highlight) {
    font-weight: 600;
}

.ctaBtn {
    background: $accent-color;
    color: #fff;
    font-size: 20px;
    border-radius: 82px;
    width: 265px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    &:hover {
        background: $primary-color;
    }
}

.cta {
    width: 15px;
    height: 15px;
    transform: translateY(2px);
}

.leftSwiperBtn,
.rightSwiperBtn {
    background: $accent-color;
    width: 37px;
    height: 37px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
        background: $primary-color;
    }
}

.leftSwiperBtn {
    left: 24px;
}

.rightSwiperBtn {
    right: 24px;
}

.maskBg {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 48px;
    padding: 32px 10px 44px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.bgImg {
    position: absolute;
    top: -166%;
    right: -726px;
    z-index: 0;
}

.bgImgMobile {
    position: absolute;
    bottom: -432px;
    left: 50%;
    transform: translateX(-49%);
    width: 1200px;
    z-index: 0;
    pointer-events: none;
}

@media screen and (max-width: 1024px) {
    .swiperSlide {
        background: #fff;
        border-radius: 48px;
        margin-top: 13px;
    }

    .slideContent {
        height: max-content;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        place-items: center;
        gap: 30px;
    }

    .wrapper {
        align-items: center;
        gap: 24px;
    }

    .textWrapper {
        width: 100%;
        gap: 16px;
        place-items: center;

        h1 {
            line-height: 24px;
            max-width: none;
            text-align: center;
        }

        .devider {
            width: 100%;
        }

        p {
            line-height: 18px;
            max-width: none;
            text-align: center;
        }
    }

    ::v-deep(.orange) {
        display: none;
    }

    ::v-deep(.highlight) {
        font-weight: 600; // Только для шрифта poppins
        font-style: italic;
    }

    .slideImg {
        width: 210px;
    }

    .leftSwiperBtn,
    .rightSwiperBtn {
        display: none;
    }
}
</style>
