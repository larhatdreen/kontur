<script setup>
defineProps({
    key: String,
    icon: String,
    link: String
})
</script>

<template>
    <a :href="link">
        <img :src="icon" :alt="key">
    </a>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

a {
    width: 35px;
    height: 35px;
    border-radius: 100px;
    background: $text-color;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: $accent-color;
    }
}
</style>