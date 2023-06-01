<template>
  <div class="container" @load="handleLoadPage">
    <div class="row">
      <div class="col-sm-4">
        <div class="question-board">
          <h3>TEST: CTDLGT</h3>
          <div class="count-down"></div>
          <the-board />
        </div>
      </div>

      <div class="col-sm-8" style="margin-top: 70px">
        <div class="question-list-body">
          <form
            @submit.prevent="handleSubmit"
            class="form-submit-test text-left"
          >
            <div
              v-for="(question, index) in questionsArray"
              class=""
              :key="index"
            >
              <the-question :orderNumber="index + 1" :question="question" />
            </div>

            <button type="submit" class="btn btn-primary">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheBoard from "./TheBoard.vue";
import TheQuestion from "./TheQuestion.vue";
import { createNamespacedHelpers } from "vuex";
const questionsStore = createNamespacedHelpers("questions");
const { mapGetters, mapActions } = createNamespacedHelpers("contest");

export default {
  components: {
    TheQuestion,
    TheBoard,
  },
  computed: {
    ...questionsStore.mapState({
      questionsArray: (state) => state.questionsArray,
      answered: (state) => state.answered,
    }),
    ...mapGetters({
      endContest: "getEndContest",
    }),
  },
  methods: {
    async handleSubmit() {
      console.log(this.answered);
      await this.submitContestAction({
        contestId: this.$route.params.contestId,
        userAssignment: this.answered,
      });
    },
    ...mapActions({
      setEndContestAction: "setEndContestAction",
      submitContestAction: "submitContestAction",
    }),
    ...questionsStore.mapActions({
      getAllQuestionsByContestIdAction: "getAllQuestionsByContestIdAction",
      clearStateInfo: "clearStateInfo",
    }),
  },
  async created() {
    // get all questions by contest id (api)
    this.clearStateInfo();
    await this.getAllQuestionsByContestIdAction(this.$route.params.contestId);

    // count dowm
    if (!this.endContest) {
      let end = new Date(new Date().valueOf() + 90 * 60 * 1000);
      console.log(end.toUTCString());
      this.setEndContestAction(end);

      let distance = this.endContest - new Date();
      let x = setInterval(function () {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.querySelector(".count-down"))
          document.querySelector(".count-down").innerHTML =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
          clearInterval(x);
          document.querySelector(".count-down").innerHTML = "OK";
        }
        distance -= 1000;
      }, 1000);
    }
  },
};
</script>



<style>
label {
  margin-left: 8px;
}
.question-board {
  position: fixed;
  top: 70px;
  left: 30px;
}
html {
  scroll-behavior: smooth;
}
</style>