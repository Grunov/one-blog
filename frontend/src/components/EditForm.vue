<template lang="pug">
    form.form.edit-form(@submit.prevent="submitHandler")

        .alert.alert-danger(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
        .alert.alert-danger(v-if="errors") {{errors.message}}
        div.d-flex.align-items-center.mb-4(v-if="submitStatus === 'REQUEST'")
            .spinner-border.text-warning.me-3
            span Loading.. 
        textarea.edit-form__textarea.form-control.mb-4(v-model.trim="$v.text.$model")
        button.btn.btn-success.w-100(type="submit") Save
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { 
    UPDATE_POST_API, 
    GET_ERRORS 
} from '@/store/constants';

export default {
    name: 'edit-form',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        id: null,
        text: '',
        submitStatus: null
    }),
    validations: {
        text: {
            required,
            minLength: minLength(30),
            maxLength: maxLength(300)
        }
    },
    computed: {
        ...mapGetters({
            errors: `post/${GET_ERRORS}`
        }),
    },
    mounted() {
        this.id = this.$props.post.id;
        this.text = this.$props.post.text;
    },
    methods: {
        ...mapActions({
            updatetPost: `post/${UPDATE_POST_API}`,
        }),
        async submitHandler() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
                return;
            }
            try {
                this.submitStatus = 'REQUEST';
                await this.updatetPost({
                    id: this.id,
                    text: this.text,
                })
                if(this.errors) {
                    this.submitStatus = null;
                    return;
                }
                this.$router.push({name: 'my-posts'});
            }
            catch(error) {
                console.log(error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .edit-form {
    &__textarea {
      height: 240px;
      resize: none;
    }
  }
</style>