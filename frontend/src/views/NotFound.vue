<template lang="pug">
    .not-found-view
        div.m-auto
            h1 404. Page not found.
            router-link(to="/") Go to home page
</template>

<style lang="scss" scoped>
    .not-found-view {
        display: flex;
        width: 100vw;
        height: 100vh;
    }
</style>