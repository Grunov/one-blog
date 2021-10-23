<template lang="pug">
app-layout
  .post-view
    h1 One post by {{post.authorName}}. 
    small {{formattedDate}}
    hr
    br
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
}
</style>