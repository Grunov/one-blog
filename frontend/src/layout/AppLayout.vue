<template lang="pug">
    .app-layout
        navbar
        .container.pt-5.mt-5
            slot
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    components: {
        Navbar
    }
}
</script>