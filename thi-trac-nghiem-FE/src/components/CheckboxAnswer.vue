<template>
  <div v-for="(answer, index) in question.answers" class="" :key="index">
    <div class="answer-item">
      <input
        type="checkbox"
        :id="index + 'of' + orderNumber"
        :name="'answersOfQuestion' + orderNumber"
        :value="answer"
        v-model="answerSelected"
        @click="handleAddAnswer(answer, index)"
      />
      <label :for="index + 'of' + orderNumber">{{ answer.answerText }}</label>
    </div>
    <br />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("questions");
export default {
  data() {
    return {
      answerSelected: [],
    };
  },
  props: {
    question: {
      type: Object,
    },
    orderNumber: {
      type: String,
    },
  },
  methods: {
    ...mapActions({
      addAnswer: "addAnswerAction",
    }),
    handleCheck() {
      console.log(this.answerSelected);
    },
    handleAddAnswer(answer) {
      let answerPos = this.answerSelected.indexOf(answer);
      if (answerPos != -1) this.answerSelected.splice(answerPos, 1);
      else this.answerSelected.push(answer); // important!!!
      let obj = {
        questionNumber: this.orderNumber,
        question: this.question,
        answer: this.answerSelected,
      };
      this.addAnswer(obj);
    },
  },
};
</script>

<style scoped>
label {
  display: inline-block;
  width: 90%;
}
.answer-item {
  display: inline-block;
  margin-bottom: 5px;
  width: 100%;
  background-color: rgb(228, 241, 236);
  padding: 2px 4px;
  padding-top: 8px;
  border-radius: 5px;
}
</style>