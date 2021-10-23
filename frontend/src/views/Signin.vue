<template lang="pug">
  empty-layout
    .signin-view
      h1.signin-view__title.text-center.mb-5|Signin
      signin-form.signin-view__form
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout';
import SigninForm from "@/components/SigninForm";

export default {
  name: 'Signin',
  components: {
    EmptyLayout,
    SigninForm
  }
}
</script>

<style lang="scss" scoped>
  .signin-view {
    margin: auto;
  }
</style>