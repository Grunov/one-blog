<template lang="pug">
  form.signin-form.form(@submit.prevent="submitHandler")
    .alert.alert-danger(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
    .alert.alert-danger(v-if="errorMessage") {{errorMessage}}
    .alert.alert-danger(v-if="errors.length") 
      ul
        li(v-for="error in errors" :key="error.name") Field {{error.param}} : {{error.msg}}

    div.d-flex.align-items-center.mb-4(v-if="submitStatus === 'REQUEST'")
        .spinner-border.text-warning.me-3
        span Loading.. 

    .mb-3
      label.form-label(for="name") Name
      input.form-control#email(
        type="text",
        v-model.trim="$v.name.$model",
        :class="{'is-invalid': $v.name.$dirty && (!$v.name.required || !$v.name.maxLength || !$v.name.minLength )}",
        autocomplete="current-name"
      )
      .invalid-feedback(
          v-if="$v.name.$dirty && !$v.name.required"
      ) Field is required

      .invalid-feedback(
          v-if="$v.name.$dirty && (!$v.name.maxLength || !$v.name.minLength)"
      ) No shorter than {{$v.name.$params.maxLength.max}} and no longer than {{$v.name.$params.minLength.min}} characters
      
    .mb-3
      label.form-label(for="email") Email
      input.form-control#email(
        type="email",
        v-model.trim="$v.email.$model",
        :class="{'is-invalid': $v.email.$dirty && (!$v.email.required || !$v.email.email)}",
        autocomplete="current-email"
      )
      .invalid-feedback(
          v-if="$v.email.$dirty && !$v.email.required"
      ) Field is required

      .invalid-feedback(
          v-if="$v.email.$dirty && !$v.email.email"
      ) Fill correctly email

    .mb-3
      label.form-label(for="password") Password
      input.form-control#password(
        type="password",
        v-model.trim="$v.password.$model",
        :class="{'is-invalid': $v.password.$dirty && (!$v.password.required || !$v.password.maxLength || !$v.password.minLength )}",
        autocomplete="current-password"
      )
      .invalid-feedback(
          v-if="$v.password.$dirty && !$v.password.required"
      ) Field is required

      .invalid-feedback(
          v-if="$v.password.$dirty && (!$v.password.maxLength || !$v.password.minLength)"
      ) No shorter than {{$v.password.$params.maxLength.max}} and no longer than {{$v.password.$params.minLength.min}} characters

    button.btn.btn-success.w-100.mb-4(type="submit") Sign up
    p Already have an account? 
      router-link(:to="{name: 'signin'}") Sign in
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from 'vuex';
import {
  SIGNUP,
  GET_ERRORS,
  GET_ERROR_MESSAGE,
} from '@/store/constants'

export default {
  name: 'SigningForm',
  data: () => ({
    name: '',
    email: '',
    password: '',
    submitStatus: null
  }),
  validations: {
    name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(32),
    },
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
      errors: `auth/${GET_ERRORS}`,
      errorMessage: `auth/${GET_ERROR_MESSAGE}`
    })
  },
  methods: {
    ...mapActions({
      signup: `auth/${SIGNUP}`
    }),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          return;
      }
      try {
          this.submitStatus = 'REQUEST';
          await this.signup({
            name: this.name,
            email: this.email,
            password: this.password
          });
          if(this.errorMessage) {
            this.submitStatus = null;
            return;
          }
          this.submitStatus = 'SUCCESS';
          this.$router.push({name: 'dashboard'});
      }
      catch(error) {
          console.log(error);
      }
    }
  }
};
</script>
