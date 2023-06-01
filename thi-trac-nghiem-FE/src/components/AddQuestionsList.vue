<template>
  <div class="main container">
    <h2>Thêm câu hỏi</h2>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Môn học</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01" v-model="subjectId">
        <option selected>-- Chọn môn học --</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <form @submit.prevent="handleAddQuestion">
      <div class="form-group add-form">
        <label for="">Chủ đề</label>
        <input
          type="text"
          class="form-control"
          id=""
          placeholder="Enter topic of question..."
          v-model="topic"
        />
        <br />
        <label for="">Đề bài</label>
        <input
          type="text"
          class="form-control"
          id=""
          placeholder="Enter question"
          v-model="question"
        />
        <br />
        <div class="number-of-answers-container">
          <label for="">Số lượng đáp án</label>
          <div class="btn btn-primary" @click="handleDecreaseAnswers">-</div>
          <input
            type="text"
            class="text-center"
            name=""
            id=""
            v-model="numberOfAnswers"
          />
          <div class="btn btn-primary" @click="handleIncreaseAnswers">+</div>
        </div>
        <div v-for="(answer, index) in answersList" class="" :key="index">
          <AddAnAnswer :answerNum="index" :answersList="answersList" />
        </div>
        <button class="btn btn-info">ADD</button>
      </div>
    </form>
  </div>
</template>

<script>
import AddAnAnswer from "./AddAnAnswer.vue";
// const { mapActions } = createNamespacedHelpers("question");
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");
const addQAStore = createNamespacedHelpers("addQA");

export default {
  components: {
    AddAnAnswer,
  },
  data() {
    // questionsList: new Array(100);
    return {
      question: "",
      numberOfAnswers: 4,
      answersList: new Array(4),
      subjectId: 1,
      topic: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
    ...addQAStore.mapGetters({
      QA: "getQA",
    }),
  },
  methods: {
    handleDecreaseAnswers() {
      if (this.numberOfAnswers === 1) return;
      this.numberOfAnswers--;
      this.answersList.length = this.numberOfAnswers;
    },
    handleIncreaseAnswers() {
      if (this.numberOfAnswers === 10) return;
      this.numberOfAnswers++;
      this.answersList.length = this.numberOfAnswers;
    },
    handleAddQuestion() {
      this.addQuestionAction(this.question);
      this.addSubjectIdAction(+this.subjectId);
      this.addTopicAction(this.topic);
      // alert(this.QA);
      this.addQAAction(this.QA);
    },
    toErrorPage() {
      this.$router.push("error-page");
    },
    ...mapActions({
      checkUserLoggedAction: "checkUserLoggedAction",
    }),
    ...addQAStore.mapActions({
      addQuestionAction: "addQuestionAction",
      addAnswerAction: "addAnswerAction",
      addSubjectIdAction: "addSubjectIdAction",
      addQAAction: "addQAAction",
      addTopicAction: "addTopicAction",
    }),
    getUserToken() {
      const token = this.$cookies.get("token");
      return token;
    },
  },
  async created() {
    const token = this.getUserToken();
    if (token) {
      await this.checkUserLoggedAction(token);
      console.log(">>>check");
      console.log(this.user);
      if (this.user.role != "2") this.$router.push("error-page");
    }
  },
};
</script>

<style scopted>
.add-form {
  text-align: left;
}

.add-an-answer {
  display: flex;
  margin-bottom: 5px;
}

.add-an-answer label {
  flex: 1;
  margin-top: 10px;
}
.add-an-answer input {
  flex: 10;
}

.number-of-answers-container {
  margin-bottom: 10px;
}
.number-of-answers-container label {
  margin-right: 10px;
}
.number-of-answers-container div,
.number-of-answers-container input {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 0;
  border: 1px solid #ccc;
}
</style>