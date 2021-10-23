<template lang="pug">
  .create-post
    h1.mb-5 Create post
    create-form
</template>

<script>
import CreateForm from '@/components/CreateForm'

export default {
    name: 'create-post',
    components: {
        CreateForm
    }
}
</script>