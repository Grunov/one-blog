<template lang="pug">
  empty-layout
    .signup-view
      h1.signup-view__title.text-center.mb-5 Signup
      signup-form.signup-view__form
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout';
import SignupForm from "@/components/SignupForm";

export default {
  name: 'Signup',
  components: {
    EmptyLayout,
    SignupForm
  }
}
</script>

<style lang="scss" scoped>
  .signup-view {
    margin: auto;
  }
</style>