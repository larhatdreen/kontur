<script setup>
import img1 from '@/assets/processImg1.webp'
import img2 from '@/assets/processImg2.webp'

const processContent = [
    {
        img: img1,
        title: 'Помощь и поддержка',
        text: 'Если в процессе обучения возникнут сложности, вы всегда сможете задать вопрос своему наставнику.',
        secondText: 'Раз в несколько уроков вы будете получать большое задание, которое нужно будет сдавать на проверку код-ревьюеру. Он внимательно изучит ваш код, найдет ошибки и поможет вам стать лучше.'
    },
    {
        img: img2,
        title: 'Методика обучения',
        text: 'Весь учебный материал структурирован по принципу «спирального обучения». Сначала вы получаете базовые знания, а затем на каждом витке спирали углубляетесь в изученные темы, доводя их понимание до совершенства. Такой подход упрощает обучение и гарантирует, что вы не пропустите ничего важного.',
    }
]
</script>

<template>
    <section>
        <div v-for="(content, i) in processContent" :key="i" class="processContainer"
            :class="{ last: i === processContent.length - 1 }">
            <div class="imgContainer">
                <img :src="content.img" alt="Изображение">
            </div>
            <div class="textWrapper">
                <h2>{{ content.title }}</h2>
                <div class="innerWrapper">
                    <p>{{ content.text }}</p>
                    <p v-if="content.secondText">{{ content.secondText }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

section {
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    gap: 32px;
}

.processContainer {
    display: flex;
    gap: 32px;
    align-items: stretch;

    .imgContainer {
        flex: 1;
        position: relative;
        overflow: hidden;
        border-radius: 40px;
        max-width: 398px;
        max-height: 313px;

        img {
            position: relative;
            right: 55px;
            height: 100%;
            object-fit: cover;
        }
    }
}

.last {
    flex-direction: row-reverse;
}

h2 {
    font-size: clamp(20px, 1.1vw, 32px);
    line-height: 30px;
    font-weight: 400;
}

p {
    font-size: $font-size-m;
    line-height: 25px;
}

.textWrapper {
    flex: 1;
    background: $bg-color;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 55px 80px 55px 100px;
    box-sizing: border-box;
}

.innerWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

@media screen and (max-width: 1024px) {
    section {
        padding-top: 30px;
        gap: 12px;
    }

    .processContainer {
        gap: 12px;

        .imgContainer {
            max-height: 234px;
            height: 234px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                position: static;
                object-fit: cover;
                width: 100%;
            }
        }
    }

    h2 {
        line-height: 19px;
    }

    p {
        line-height: 17px;
    }

    .textWrapper {
        padding: 38px 20px;
        border-radius: 30px;
    }
}

@media screen and (max-width: 670px) {
    .processContainer {
        flex-direction: column;
    }
}
</style>