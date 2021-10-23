<template lang="pug">
  app-layout
    .dashboard-view
      .user-block
        .alert.alert-warning(v-if="!user.isActivated") 
          | Для активации аккаунта вам нужно проверить свою почту 
          strong {{user.email}}. 
          | И перейти по ссылке в пиьсме.          
      router-view
</template>

<script>
import AppLayout from "@/layout/AppLayout";
import { mapGetters} from 'vuex';
import {
  GET_USER
} from "@/store/constants";

export default {
  name: "Dashboard",
  components: {
    AppLayout,
  },
  computed: {
    ...mapGetters({
      user: `auth/${GET_USER}`
    })
  }
};
</script>

<style lang="scss" scoped>

</style>