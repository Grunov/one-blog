<template lang="pug">
  .post-item.card.bg-dark  
    .card-body
      .d-flex.justify-content-between.border-bottom.pb-2
        strong 
          | Author:
          span.text-info.ms-2 {{ post.authorName }} 
        time.text-warning.me-3 {{ formattedDate }}
        
    img.card-img-top(v-if="post.image" :src="imageSrc")

    .card-body
      .h3.card-title(v-if="post.title") {{ post.title }}
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
    imageSrc() {
      return `${process.env.VUE_APP_STATIC_URL}/${this.$props.post.image}`
    }
  },
  methods: {
    ...mapActions({
      deletePost: `post/${DELETE_POST_API}`,
      deleteMyPost: `mypost/${DELETE_POST_API}`,
    }),
    delPost(id) {
      const confirm = window.confirm('Are you sure you want to delete this post?');
      if(confirm) {
        if(this.isCurrentUserPosts) {
          this.deleteMyPost(id);
        }
        this.deletePost(id);
      }
      return false;
    }
  }
};
</script>