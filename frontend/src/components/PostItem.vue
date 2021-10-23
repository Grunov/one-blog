<template lang="pug">
.post-item.card.mb-3
  .card-header.d-flex.justify-content-between
    strong Author: {{ post.authorName }}
    time {{ formattedDate }}
  .card-body
    p.card-text {{ post.text }}
  .card-footer.d-flex.justify-content-end
    template(v-if="isCurrentUserPosts" )
      button.btn.btn-danger.me-2(@click="delPost(post.id)") Delete
      router-link(:to='`/dashboard/my-posts/edit/${post.id}`').btn.btn-warning.me-2(@click="deletePost(post.id)") Edit
    router-link.btn.btn-outline-info(:to="`/posts/${post.id}`") Show more...
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { 
  GET_USER,
  DELETE_POST_API
} from "../store/constants";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      user: `auth/${GET_USER}`,
    }),
    formattedDate() {
      const date = new Date(this.$props.post.date);
      return date.toDateString();
    },
    isCurrentUserPosts() {
      if (!this.user) return false;
      return this.user.id === this.$props.post.authorId ? true : false;
    },
  },
  methods: {
    ...mapActions({
      deletePost: `post/${DELETE_POST_API}`
    }),
    delPost(id) {
      const confirm = window.confirm('Are you sure you want to delete this post?');
      if(confirm) {
        this.deletePost(id);
      }
      return false;
    }
  }
};
</script>