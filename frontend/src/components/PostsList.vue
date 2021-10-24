<template lang="pug">
  .posts-list 

    template(v-if="posts.length")
      transition-group(name="bounce")
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
    .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>