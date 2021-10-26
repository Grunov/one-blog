<template lang="pug">
.posts-view 
  h1.mb-3 My posts
  posts-list( :posts="posts")
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import PostsList from "@/components/PostsList";
import { 
  GET_USER,
  GET_ALL_POSTS_API, 
  GET_ALL_POSTS 
} from "@/store/constants";

export default {
  computed: {
    ...mapGetters({
      posts: `mypost/${GET_ALL_POSTS}`,
      user: `auth/${GET_USER}`
    }),
  },
  methods: {
    ...mapActions({
      getUserPostsFromApi: `mypost/${GET_ALL_POSTS_API}`,
    }),
  },
  mounted() {
    this.getUserPostsFromApi(this.user.id);
  },
  components: {
    PostsList,
  },
};
</script>