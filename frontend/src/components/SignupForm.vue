<template lang="pug">
  form.signin-form.form(@submit.prevent="submitHandler")
    .mb-3
      label.form-label(for="name") Name
      input.form-control#email(
        type="text",
        v-model="name",
        autocomplete="current-name"
      )
    .mb-3
      label.form-label(for="email") Email
      input.form-control#email(
        type="email",
        v-model="email",
        autocomplete="current-email"
      )
    .mb-3
      label.form-label(for="password") Password
      input.form-control#password(
        type="password",
        v-model="password",
        autocomplete="current-password"
      )
    button.btn.btn-success.w-100.mb-4(type="submit") Sign up
    p Already have an account? 
      router-link(:to="{name: 'signin'}") Sign in
</template>

<script>
import {mapActions} from 'vuex';
import {
  SIGNUP
} from '@/store/constants'

export default {
  name: 'SigningForm',
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions({
      signup: `auth/${SIGNUP}`
    }),
    submitHandler() {
      this.signup({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'dashboard'})
      })
    }
  }
};
</script>
