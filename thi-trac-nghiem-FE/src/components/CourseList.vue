<template>
  <section class="container">
    <div class="row">
      <div
        v-for="(item, index) in coursesArray"
        class="col-sm-3"
        :key="index"
        style="margin-top: 16px"
      >
        <CourseItem
          :courseItem="item"
          @custom-handle-start-test="handleStartTest"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CourseItem from "./CourseItem.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("courses");

export default {
  components: {
    CourseItem,
  },
  computed: {
    ...mapGetters({
      coursesArray: "getAllCourseSearch",
    }),
  },
  methods: {
    ...mapActions({
      getAllCoursesAction: "getAllCoursesAction",
    }),
    handleStartTest(course) {
      console.log(course);
    },
  },
  created() {
    this.getAllCoursesAction();
  },
};
</script>

<style scoped>
</style>