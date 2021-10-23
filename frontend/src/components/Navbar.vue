<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-dark.bg-dark.fixed-top
    .container
      router-link.navbar-brand(to="/") Oneblog
      button.navbar-toggler(type="button")
        span.navbar-toggler-icon
      div.collapse.navbar-collapse
        ul.navbar-nav.mb-2.mb-lg-0
          template(v-if='authState')
            li.nav-item
              router-link.nav-link(:to="{name: 'dashboard'}") My posts
            li.nav-item
                router-link.nav-link(:to="{name: 'create-post'}") Create post
        ul.navbar-nav.ms-auto.mb-2.mb-lg-0
          template(v-if='authState')
            li.nav-item
              button.btn.btn-danger(@click="logout") Signout
          template(v-if='!authState')
            li.nav-item
                router-link.nav-link(:to="{name: 'signup'}") Signup
            li.nav-item
                router-link.nav-link(:to="{name: 'signin'}") Signin
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { 
  GET_AUTH_STATE,
  SIGNOUT
} from '@/store/constants';

export default {
  computed: {
    ...mapGetters({
      authState: `auth/${GET_AUTH_STATE}`
    })
  },
  methods: {
    ...mapActions({
      signout: `auth/${SIGNOUT}`,
    }),
    async logout() {
      await this.signout().then(() => {
        this.$router.push({ name: 'signin' });
      });
    },
  },
};
</script>