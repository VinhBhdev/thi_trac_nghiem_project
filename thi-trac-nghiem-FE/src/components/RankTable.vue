<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Class</th>
          <th scope="col">Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in rankTable" :key="index">
          <th scope="row">{{ user.rank }}</th>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.class }}</td>
          <td>{{ user.point }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const contestStore = createNamespacedHelpers("contest");
export default {
  data() {
    return {
      rankTable: [],
    };
  },
  methods: {
    ...contestStore.mapActions({
      getContestRankAction: "getContestRankAction",
    }),
  },
  async created() {
    this.rankTable = await this.getContestRankAction(
      this.$route.params.contestId
    );
  },
};
</script>

<style>
</style>