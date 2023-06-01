<template>
  <div class="card text-left">
    <img class="card-img-top" :src="courseItem.imageUrl" alt="" />
    <div class="card-body">
      <h4 class="card-title">{{ courseItem.courseName }}</h4>
      <p class="card-text">{{ courseItem.courseDesc }}</p>
      <button class="btn btn-info" @click="handleStartTest(courseItem)">
        Bắt đầu thi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courseItem: {
      type: Object,
    },
  },

  methods: {
    handleStartTest() {
      this.$router.push("/courses/" + this.courseItem.id);
    },
  },
};
</script>

<style>
</style>