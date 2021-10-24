<template lang="pug">
form.form.create-form(@submit.prevent="submitHandler")
  .alert.alert-danger(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
  .alert.alert-danger(v-if="errors") {{ errors.message }}
  .d-flex.align-items-center.mb-4(v-if="submitStatus === 'REQUEST'")
    .spinner-border.text-warning.me-3
    span Loading..
  
  .mb-3 
    label.form-label(for="text") Title
    input#title.create-form__title.form-control(v-model.trim="$v.title.$model")

    .invalid-feedback(v-if="$v.title.$dirty && !$v.title.required") 
        | Field is required

  .mb-3 
    label.form-label(for="text") Text
    textarea#text.create-form__text.form-control(v-model.trim="$v.text.$model")
    
    .invalid-feedback(v-if="$v.text.$dirty && !$v.text.required") 
      | Field is required

    .invalid-feedback(v-if="$v.text.$dirty && !$v.text.minLength") 
      | No longer than {{$v.text.$params.minLength.min}} characters

    .invalid-feedback(v-if="$v.text.$dirty && !$v.text.maxLength") 
      | No longer than {{$v.text.$params.maxLength.max}} characters

  .mb-3
    input(type="file" accept="image/*" @change="uploadImage($event)" id="file-input")

  button.btn.btn-success.w-100(type="submit") Create
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { 
  GET_ERRORS, 
  CREATE_POST_API,
  GET_USER
} from "@/store/constants";

// const matches = helpers.regex('matches', /^[A-Za-z0-9]*$/);

export default {
  text: "create-form",
  data: () => ({
    title: '',
    text: '',
    image: null,
    message: null,
    submitStatus: null,
    formData: null
  }),
  validations: {
    title: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(160),
    },
    text: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(300),
    }
  },
  computed: {
    ...mapGetters({
      errors: `post/${GET_ERRORS}`,
      user: `auth/${GET_USER}`,
    }),
  },
  methods: {
    ...mapActions({
      createPost: `post/${CREATE_POST_API}`,
    }),
    uploadImage(event) {
      let data = new FormData();

      data.append('authorId', this.user.id); 
      data.append('authorName', this.user.name); 
      data.append('title', this.title); 
      data.append('text', this.text); 
      data.append('image', event.target.files[0]); 
      this.formData = data;
    },
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      }
      try {
        this.submitStatus = "REQUEST";
        await this.createPost(this.formData);
        if (this.errors) {
          this.submitStatus = null;
          return;
        }
        this.$router.push({ name: 'my-posts' });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .create-form {

    &__text {
      height: 280px;
      resize: none;
    }
  }

  .form-control {
    color: var(--dark);
  }
</style>