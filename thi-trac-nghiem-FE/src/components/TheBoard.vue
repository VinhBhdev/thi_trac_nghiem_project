<template>
  <div class="text-left">
    <h5>Đã chọn {{ numberOfSelectedAnwers }}/{{ numberOfQuestions }}</h5>
    <span v-for="index in numberOfQuestions" :key="index">
      <a v-if="answered[index]" :href="'#question' + index">
        <button class="btn btn-info question-box">{{ index }}</button>
      </a>
      <a v-else :href="'#question' + index">
        <button class="btn question-box">{{ index }}</button>
      </a>
      <br v-if="index % 10 == 0" />
    </span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("questions");
export default {
  computed: {
    ...mapState({
      answered: (state) => state.answered,
    }),
    ...mapGetters({
      numberOfQuestions: "getNumberOfQuestions",
      numberOfSelectedAnwers: "getNumberOfSelectedAnwers",
    }),
  },
};
</script>

<style scopted>
.active {
  color: red;
}
a {
  color: black;
}
.question-box {
  display: inline;
  width: 30px;
  height: 30px;
  padding: 2px 4px;
  margin: 3px;
  border: 1px solid #ccc;
}
</style>