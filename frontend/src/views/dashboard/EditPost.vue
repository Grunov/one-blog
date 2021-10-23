<template lang='pug'>
.edit-post
  h1.mb-3 Edit post
  edit-form(v-if='post', :post='post')
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditForm from '@/components/EditForm';
import { GET_POST_API, GET_POST } from '@/store/constants';

export default {
  name: 'edit-post',
  mounted() {
    const postId = this.$route.params.id;
    this.getPost(postId);
  },
  computed: {
    ...mapGetters({
      post: `post/${GET_POST}`,
    }),
  },
  methods: {
    ...mapActions({
      getPost: `post/${GET_POST_API}`,
    }),
  },
  components: {
    EditForm,
  },
};
</script>