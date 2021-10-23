<template lang="pug">
  .posts-list 

    template(v-if="posts.length")
      transition-group(name="posts-list")
        post-item.mb-3(
          v-for="post in posts",
          :key="post.id"
          :post="post"
        )

    template(v-if="!posts.length")
      p Don't have posts.
        router-link(:to="{name: 'create-post'}") Create post

</template>

<script>
import PostItem from '@/components/PostItem'
export default {
  name: 'PostsList',
  props: {
    posts: {
        type: Array,
        required: true
    }
  },
  components: {
    PostItem
  }
}
</script>

<style lang="scss" scoped>
    .posts-list-enter-active,
    .posts-list-leave-active {
        transition: all .3s ease;
    }
    .posts-list-enter-from,
    .posts-list-leave-to {
        opacity: 0;
    }
    .posts-list-move {
        transition: opacity 1s ease;
    }
</style>