<template>
  <div class="container text-left" style="margin-top: 120px">
    <div v-for="(item, index) in contestsList" :key="index">
      <ContestItemForAdmin :contestItemForAdmin="item" :contestIndex="index" />
    </div>
  </div>
</template>

<script>
import ContestItemForAdmin from "./ContestItemForAdmin.vue";
import { createNamespacedHelpers } from "vuex";
const contestStore = createNamespacedHelpers("contest");
export default {
  components: {
    ContestItemForAdmin,
  },
  data() {
    return {
      contestsList: [],
    };
  },
  methods: {
    ...contestStore.mapActions({
      getAllContestsForAdminAction: "getAllContestsForAdminAction",
    }),
  },
  async created() {
    let subjectId = this.$route.params.subjectId;
    this.contestsList = await this.getAllContestsForAdminAction(subjectId);
  },
};
</script>

<style>
</style>