<template>
  <section class="container">
    <div class="row">
      <div
        v-for="(item, index) in subjectsList"
        class="col-sm-3"
        :key="index"
        style="margin-top: 16px"
      >
        <SubjectItem :subjectItem="item" />
      </div>
    </div>
  </section>
</template>

<script>
import SubjectItem from "./SubjectItem.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("subjects");

export default {
  components: {
    SubjectItem,
  },
  computed: {
    ...mapGetters({
      subjectsList: "getAllSubjectSearch",
    }),
  },
  methods: {
    ...mapActions({
      getAllSubjectsAction: "getAllSubjectsAction",
    }),
  },
  created() {
    this.getAllSubjectsAction();

    setTimeout(() => {
      console.log(this.subjectsList);
    }, 3000);
  },
};
</script>

<style scoped>
</style>