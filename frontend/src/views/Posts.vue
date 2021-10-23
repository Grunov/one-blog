<template lang="pug">
app-layout
  .posts-view
    h1.mb-5 Latest posts
    app-pagination
    posts-list.posts-view__posts-list(:posts="posts")
    app-pagination
</template>

<script>
import AppLayout from '@/layout/AppLayout';
import PostsList from '@/components/PostsList';
import AppPagination from '@/components/AppPagination'
import { mapActions, mapGetters } from 'vuex';
import { GET_ALL_POSTS_API, GET_ALL_POSTS } from '@/store/constants';

export default {
  name: 'PostsView',
  computed: {
    ...mapGetters({
      posts: `post/${GET_ALL_POSTS}`,
    }),
  },
  methods: {
    ...mapActions({
      getAllPostsFromApi: `post/${GET_ALL_POSTS_API}`,
    }),
  },
  mounted() {
    this.getAllPostsFromApi();
  },
  components: {
    AppLayout,
    PostsList,
    AppPagination
  },
};
</script>

<style lang="scss" scoped>
.posts-view {
  max-width: 640px;
  margin: 0 auto;
}

.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.3s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.posts-list-move {
  transition: transform 1s ease;
}
</style>