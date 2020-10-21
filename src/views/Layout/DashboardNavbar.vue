<template>
  <div class="container-fluid bg-gradient-success">
    <b-navbar class="bg-gradient-success" type="dark" variant="info">
      <b-navbar-brand href="/dashboard">
        <img width="64px" src="/img/stocks_512px.png">
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav style="color:white" class="ml-auto navbar-dark">
        <b-nav-item href="/logout">Sign Out</b-nav-item>
        <b-nav-item :active="isActiveRoute('Profile')" href="/profile">Profile</b-nav-item>
        <b-nav-item :active="isActiveRoute('Dashboard')" href="/dashboard">Dashboard</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import {CollapseTransition} from 'vue2-transitions';
import {BaseNav, Modal} from '@/components';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  computed: {
    routeName() {
      const {name} = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    isActiveRoute(route) {
      return this.routeName === route;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    }
  }
};
</script>
<style>

</style>
