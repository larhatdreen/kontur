<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { formatPhone } from '@/utils/format'

defineProps({ phone: String })

const baseLinks = [
  { natTitle: 'Чему вы научитесь', anchor: '#' },
  { natTitle: 'Процесс обучения', anchor: '#' },
  { natTitle: 'Стоимость', anchor: '#' },
  { natTitle: 'Контакты', anchor: '#' },
]

const windowWidth = ref(window.innerWidth)
const isMenuOpen = ref(false)
const isClosing = ref(false)

const isMobile = computed(() => windowWidth.value <= 1024)

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize)
})

const navLinks = computed(() =>
  isMobile.value
    ? [...baseLinks, { natTitle: 'Регистрация', anchor: '#' }]
    : baseLinks
)

watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const closeMenu = () => {
  isClosing.value = true
  setTimeout(() => {
    isMenuOpen.value = false
    isClosing.value = false
  }, 300)
}
</script>

<template>
  <header>
    <a href="/" class="logoLink">
      <img src="/logo.svg" class="logo" alt="CoDe logo" />
    </a>

    <nav v-if="!isMobile">
      <a v-for="navLink in navLinks" :key="navLink.anchor" :href="navLink.anchor" class="navLink">
        {{ navLink.natTitle }}
      </a>
    </nav>
    <div class="mobileContainer">
        <a 
            type="tel" 
            :href="'tel:' + phone" 
            class="phone"
        >
            {{ formatPhone(phone) }}
        </a>
        <div v-if="isMobile" class="burger" @click="isMenuOpen = true">
            <div /><div /><div />
        </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isMenuOpen"
        :class="['mobileMenu', { closing: isClosing }]"
      >
        <button class="closeBtn" @click="closeMenu"><div /><div /></button>
        <nav class="mobileNav">
          <a v-for="navLink in navLinks" :key="navLink.anchor" :href="navLink.anchor" class="navLink">
            {{ navLink.natTitle }}
          </a>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<style lang="scss">
@use '@/styles/variables.scss' as *;

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 75px;
  backdrop-filter: blur(15px);
  height: 51px;
  padding: 0 34px;
  position: relative;
  z-index: 15;
}

.logoLink {
  display: flex;
  height: 25px;
}

nav {
  display: flex;
  position: absolute;
  left: 165px;
  gap: 41px;
}

.mobileContainer {
    display: flex;
    align-items: center;
    gap: 20px;
}

.navLink {
  font-size: $font-size-s;
  line-height: 103%;
  @include link-style($text-color);
}

.phone {
  font-size: $font-size-m;
  line-height: 23px;
  @include link-style($primary-color);
}

.burger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  cursor: pointer;
  div {
    height: 2px;
    background: $text-color;
    border-radius: 1px;
  }
}

.mobileMenu {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 9999;
  animation: slideIn 0.3s ease forwards;

  &.closing {
    animation: slideOut 0.3s ease forwards;
  }

  .mobileNav {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-top: 80px;
    left: 40px;

    .navLink {
      font-size: 20px;
      line-height: 40px;
    }
  }

  .closeBtn {
    cursor: pointer;
    position: absolute;
    background: none;
    width: 60px;
    height: 60px;
    right: 30px;
    top: 30px;
    display: grid;
    place-items: center;

    div {
        position: absolute;
        height: 2px;
        width: 20px;
        background: rgba(188, 188, 188, 1);

        &:first-child {
            transform: rotate(45deg);
        }
        &:last-child {
            transform: rotate(-45deg);
        }
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
