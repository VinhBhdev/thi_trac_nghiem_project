<template>
  <div :id="'question' + orderNumber" style="padding-top: 56px">
    <h5 class="question-text">
      Question {{ orderNumber }}: {{ question.questionText }}
    </h5>
    <CheckboxAnswer
      v-if="question.typeQuestion === 'checkbox'"
      :question="question"
      :orderNumber="orderNumber"
    />
    <RadioAnswer
      v-if="question.typeQuestion === 'radio'"
      :question="question"
      :orderNumber="orderNumber"
    />
    <div class="">
      <!-- <button class="btn btn-info" @click="handleCheck">CHECK ANSWER</button> -->
    </div>
  </div>
</template>

<script>
import CheckboxAnswer from "./CheckboxAnswer.vue";
import RadioAnswer from "./RadioAnswer.vue";

export default {
  components: {
    CheckboxAnswer,
    RadioAnswer,
  },
  props: {
    question: {
      type: Object,
    },
    orderNumber: {
      type: String,
    },
  },
};
</script>

<style scoped>
.question-text {
  font-size: 18px;
  text-align: justify;
}
</style>