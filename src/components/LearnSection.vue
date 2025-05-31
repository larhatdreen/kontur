<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const images = import.meta.glob('../assets/learn*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const containerRef = ref(null)
const isSingleInRow = ref(false)
const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const imageMap = Object.entries(images).reduce((acc, [path, url]) => {
  const fileName = path.split('/').pop() || ''
  const key = fileName.replace(/^learn|\.svg$/g, '')
  acc[key] = url
  return acc
}, {})

const advantagesContent = [
  {
    key: 'Hugo',
    title: 'Огромное\n количество практики',
    text: 'Более 500 самостоятельных\n заданий и 20 полноценных\n больших проектов',
  },
  {
    key: 'Modern',
    title: 'Современные\n методики обучения',
    text: 'Спиральное обучение:\n погружаемся в материал\n постепенно, виток за витком',
  },
  {
    key: 'Simple',
    title: 'Простое и понятное\n изложение',
    text: 'Вместо заумных\n терминов – примеры\n из реального мира',
  },
  {
    key: 'Flexible',
    title: 'Гибкий график\n занятий',
    text: 'Учитесь в любое\n время в удобном\n для вас темпе',
  },
  {
    key: 'Direct',
    title: 'Прямая связь с опытными\n программистами',
    text: 'Задавайте вопросы\n и отправляйте свой код\n на проверку',
  },
  {
    key: 'Payment',
    title: 'Оплата небольшими\n частями',
    text: 'Платите только за тот материал,\n который сейчас изучаете,\n а не за весь курс сразу',
  },
  {
    key: 'Fast',
    title: 'Быстрый и легкий\n возврат',
    text: 'Если передумаете учиться –\n вернем деньги за 3\n рабочих дня',
  },
]

const content = advantagesContent.map((item) => ({
  ...item,
  img: imageMap[item.key] || '',
}))

const computedContent = computed(() => {
  const result = [...content]

  if (windowWidth.value <= 1024) {
    const modernIndex = result.findIndex((i) => i.key === 'Modern')
    const directIndex = result.findIndex((i) => i.key === 'Direct')

    if (modernIndex !== -1 && directIndex !== -1) {
      const temp = result[modernIndex]
      result[modernIndex] = result[directIndex]
      result[directIndex] = temp
    }

    const last = result[result.length - 1]
    result[result.length - 1] = {
      ...last,
      title: last.title.replace(/\n/g, ' '),
      text: last.text.replace(/\n(?=[^\n]*$)/, ' '),
    }
  }

  return result
})

const checkLastRow = () => {
  const items = containerRef.value?.children
  if (!items?.length) return

  const lastRowTop = items[items.length - 1].getBoundingClientRect().top
  let countOnLastRow = 0

  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].getBoundingClientRect().top === lastRowTop) countOnLastRow++
    else break
  }

  isSingleInRow.value = countOnLastRow === 1
}

let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(checkLastRow)
  if (containerRef.value) resizeObserver.observe(containerRef.value)

  window.addEventListener('resize', updateWindowWidth)
  window.addEventListener('resize', checkLastRow)
  checkLastRow()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('resize', checkLastRow)
  resizeObserver?.disconnect()
})
</script>

<template>
    <section>
        <h1>Обучение в CoDe – это<br> удобно и результативно</h1>
        <div class="advantages" ref="containerRef">
            <div v-for="(advantage, i) in computedContent" :key="advantage.key" class="advantage" 
                :class="{
                    autoFlex: isSingleInRow,
                    rowDirection: isSingleInRow && i === computedContent.length - 1
                }"
            >
                <img :src="advantage.img" :alt="`${advantage.key}`">
                <div class="advantageText">
                    <p>{{ advantage.title }}</p>
                    <span>{{ advantage.text }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

section {
    place-items: center;
    padding-top: 60px;
}

h1 {
    font-weight: 600;
    text-align: center;
    line-height: 46px;
}

.advantages {
    display: flex;
    flex-direction: row;
    padding-top: 34px;
    gap: 27px;
    flex-wrap: wrap;
    justify-content: center;
}

.advantage {
    background: $bg-color;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 270px;
    padding: 50px 0 31px 0;
    gap: 20px;

    .advantageText {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;

        p,
        span {
            text-align: center;
            white-space: pre-line;
        }

        p {
            font-size: $font-size-m;
            line-height: 18.5px;
        }

        span {
            font-size: $font-size-s;
            line-height: 15px;
        }
    }

    &.autoFlex {
        flex: 1 1 auto;
    }

    &.rowDirection {
    flex-direction: row;
    gap: 20px;

    .advantageText {
      text-align: left;
      align-items: flex-start;

      p,
      span {
        text-align: left;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
    section {
        padding-top: 30px;
    }
    .advantages {
        padding-top: 24px;
        gap: 10px;
    }

    .advantage {
        border-radius: 20px;
        padding: 30px 0 20px 0;
        gap: 10px;
    
        .advantageText {
            gap: 4px;
            place-items: center;

            p, span {
                line-height: 12px;
            }

        }

        img {
            zoom: 0.69;
        }
    }

    h1 {
        font-weight: 500;
        line-height: 23px;
    }
}
@media screen and (max-width: 720px) {
    .advantage {
        min-width: 145px;
        width: calc(45% - 27px);
    }
}
</style>