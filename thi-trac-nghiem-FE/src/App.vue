<template class="mt-0">
  <NavBar />
  <div class="" style="margin-top: 55px">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      user: "Bui Hoang Vinh",
    };
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>


