<template lang="pug">
  nav.app-pagination(aria-label="Page navigation")
    ul.app-pagination__list.pagination

      li.app-pagination__item.page-item(:class="{'disabled': currentPage <= 1}")
        router-link.app-pagination__link.page-link(
          :to="`/posts/page/${currentPage - 1}`",
          :aria-disabled="currentPage <= 1",
        ) Previous

      li.app-pagination__item.page-item(
        v-for="page in pages",
        :key="page"
        :class="{'active': currentPage === page}"
      )
        template(v-if="currentPage !== page")
          router-link.app-pagination__link.page-link(:to="`/posts/page/${page}`") {{ page }}
        template(v-if="currentPage === page") 
          span.app-pagination__link.page-link {{ page }}

      li.app-pagination__item.page-item(:class="{'disabled': currentPage >= pages}")
        router-link.app-pagination__link.page-link(
          :to="`/posts/page/${currentPage + 1}`",
          :aria-disabled="currentPage >= pages",
        ) Next
        
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GET_ALL_POSTS_API, GET_TOTAL_COUNT, GET_LIMIT } from '@/store/constants'
export default {
  name: 'AppPagination',
  computed: {
    ...mapGetters({
      totalCount: `post/${GET_TOTAL_COUNT}`,
      limit: `post/${GET_LIMIT}`
    }),
    pages() {
      return Math.ceil(this.totalCount / this.limit);
    },
    currentPage() {
      return parseInt(this.$route.params.number);
    }
  },
  methods: {
    ...mapActions({
      getAllPostsFromApi: `post/${GET_ALL_POSTS_API}`,
    }),
  },
  watch: {
    $route(to) {
      this.getAllPostsFromApi(to.params.number);
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-pagination {

  }
</style>