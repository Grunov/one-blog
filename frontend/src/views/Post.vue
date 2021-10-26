<template lang="pug">
app-layout
  .post-view
    .post-view__header
      h1.h2.post-view__title.mb-4(v-if="post.title") {{ post.title }}
      .d-flex.justify-content-start.border-bottom.pb-2.mb-4
        strong.me-3 
          | Author:
          span.text-info.ms-2 {{ post.authorName }} 
        time.text-warning {{ formattedDate }}
    .post-view__media
      img.img-fluid.mb-4(v-if="post.image" :src="imageSrc")
    .post-view__text
      p {{post.text}}

</template>

<script>
import AppLayout from "@/layout/AppLayout";
import { mapActions, mapGetters } from "vuex";
import { GET_POST_API, GET_POST} from "@/store/constants";

export default {
  name: "PostView",
  computed: {
    formattedDate() {
      const date = new Date(this.post.date);
      return date.toDateString();
    },
    ...mapGetters({
      post: `post/${GET_POST}`,
    }),
    imageSrc() {
      return `${process.env.VUE_APP_STATIC_URL}/${this.post.image}`
    }
  },
  methods: {
    ...mapActions({
      getPostFromApi: `post/${GET_POST_API}`,
    }),
  },
  mounted() {
    this.getPostFromApi(this.$route.params.id);
  },
  components: {
    AppLayout
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  max-width: 640px;
  margin: 0 auto;

  &__text{
    
    & * {
      font-size: 18px;
      word-break: break-all;
    }
  }
}
</style>