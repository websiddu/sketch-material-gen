<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    window.oncontextmenu = this.handleContextMenu;
  },
  methods: {
    handleContextMenu(evt) {
      if (!evt.altKey) {
        evt.preventDefault();
      }
    },
  },
};
</script>

<style>

</style>
