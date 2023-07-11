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
const authStore = createNamespacedHelpers("auth");
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
    ...authStore.mapState({
      userId: (state) => state.user?.id,
    }),
  },
  methods: {
    ...mapActions({
      getAllContestsAction: "getAllContestsAction",
    }),
    ...authStore.mapActions({
      checkUserLoggedAction: "checkUserLoggedAction",
    }),
    handleStartTest(course) {
      console.log(course);
    },
  },
  async created() {
    const token = this.$cookies.get("token");
    if (token) {
      await this.checkUserLoggedAction(token);
    }
    console.log(this.userId);
    this.getAllContestsAction({
      userId: this.userId,
      subjectId: this.$route.params.subjectId,
    });
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