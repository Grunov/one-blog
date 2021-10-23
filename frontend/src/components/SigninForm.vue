<template lang="pug">
  form.signin-form.form(@submit.prevent="submitHandler")
    .alert.alert-danger(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
    .alert.alert-danger(v-if="errors") {{errors.message}}
    div.d-flex.align-items-center.mb-4(v-if="submitStatus === 'REQUEST'")
        .spinner-border.text-warning.me-3
        span Loading.. 
    .mb-3
      label.form-label(for="email") Email
      input.form-control#email(
        type="email",
        v-model.trim="$v.email.$model",
        :class="{'is-invalid': $v.email.$dirty && !$v.email.required}",
        autocomplete="current-email"
      )
      .invalid-feedback(
          v-if="$v.email.$dirty && !$v.email.required"
      ) Field is required

    .mb-3
      label.form-label(for="password") Password
      input.form-control#password(
        type="password",
        v-model.trim="$v.password.$model",
        autocomplete="current-password"
      )
    button.btn.btn-success.w-100.mb-4(type="submit") Sign in
    p New to Oneblog? 
      router-link(:to="{name: 'signup'}") Create an account.
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import {
  SIGNIN,
  GET_ERRORS
} from '@/store/constants'

export default {
  name: 'SigningForm',
  data: () => ({
    email: 'test@test.com',
    password: 'testtest',
    submitStatus: null
  }),
  validations: {
    email: {
        required,
        email
    },
    password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(32),
    }
  },
  computed: {
    ...mapGetters({
        errors: `post/${GET_ERRORS}`
    }),
  },
  methods: {
    ...mapActions({
      signin: `auth/${SIGNIN}`
    }),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          return;
      }
      try {
          this.submitStatus = 'REQUEST';
          await this.signin({
            email: this.email,
            password: this.password
          })
          if(this.errors) {
              this.submitStatus = null;
              return;
          }
          this.$router.push({name: 'dashboard'})
      }
      catch(error) {
          console.log(error);
      }
    }
  }
};
</script>
