<template>
  <div class="add-an-answer">
    <input
      type="checkbox"
      style="flex: 0"
      name=""
      id=""
      v-model="isResult"
      @change="updateResultQuestion"
    />
    <label for="exampleInputEmail1"
      >Đáp án {{ String.fromCharCode(answerNum + 65) }}</label
    >
    <input
      type="text"
      class="form-control answer-input"
      placeholder="Enten an answer"
      v-model="answerContent"
      @input="updateAnswerContent"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("addQA");

export default {
  data() {
    return {
      answerContent: "",
      isResult: false,
    };
  },

  props: {
    answerNum: {
      type: Number,
    },
  },
  methods: {
    ...mapActions({
      addAnswerAction: "addAnswerAction",
      updateResultQuestionAction: "updateResultQuestionAction",
    }),
    updateAnswerContent() {
      console.log(this.answerContent, this.answerNum);
      this.addAnswerAction({
        answerNum: this.answerNum,
        answerContent: this.answerContent,
      });
    },
    updateResultQuestion() {
      this.updateResultQuestionAction({
        answerNum: this.answerNum,
        isResult: this.isResult,
      });
    },
  },
};
</script>

<style>
</style>