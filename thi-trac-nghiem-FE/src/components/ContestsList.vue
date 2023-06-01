<template>
  <div class="container contests-list-container">
    <!-- <ContestItem />
    <ContestItem />
    <ContestItem /> -->

    <div v-for="(item, index) in contestsList" :key="index">
      <ContestItem :contestItem="item" :contestIndex="index" />
    </div>
  </div>
</template>

<script>
import ContestItem from "./ContestItem.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("contest");
export default {
  components: {
    ContestItem,
  },
  props: {
    subjectId: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      contestsList: "getAllContestsSearch",
    }),
  },
  methods: {
    ...mapActions({
      getAllContestsAction: "getAllContestsAction",
    }),
    handleStartTest(course) {
      console.log(course);
    },
  },
  created() {
    this.getAllContestsAction(this.$route.params.subjectId);
    setTimeout(() => {
      console.log(this.contestsList);
    }, 2500);
  },
};
</script>

<style scopted>
.contests-list-container {
  margin-top: 100px;
}
</style>