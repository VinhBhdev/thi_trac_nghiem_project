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

    <div :class="resultModalClass">
      <div class="result-contest-container">
        <div class="result-contest__header">
          <h3>KẾT QUẢ CONTEST</h3>
        </div>
        <div class="result-contest__body">
          <h4>
            Trả lời đúng: {{ userResult.numberOfRightAnswers }}/
            {{ questionsArray.length }}
          </h4>
          <div class="result-table">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col" style="width: 10%">STT</th>
                  <th scope="col" style="width: 80%">Câu hỏi</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in userResult.resultDetail"
                  class=""
                  :key="index"
                >
                  <th scope="row">{{ item.questionNumber }}</th>
                  <td>{{ item.question.questionText }}</td>
                  <td v-if="item.status === 'AC'" class="alert-success">
                    {{ item.status }}
                  </td>
                  <td v-else class="alert-danger">{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="home-page-link">
          <a href="/">Trở về trang chủ</a>
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
const contestStore = createNamespacedHelpers("contest");
const authStore = createNamespacedHelpers("auth");
export default {
  data() {
    return {
      userResult: "",
      resultModalClass: {
        "result-contest-modal": true,
        modal: true,
        open: false,
      },
    };
  },
  components: {
    TheQuestion,
    TheBoard,
  },
  computed: {
    ...questionsStore.mapState({
      questionsArray: (state) => state.questionsArray,
      answered: (state) => state.answered,
    }),
    ...contestStore.mapGetters({
      endContest: "getEndContest",
    }),
    ...authStore.mapState({
      userId: (state) => state.user.id,
    }),
  },
  methods: {
    async handleSubmit() {
      console.log(this.answered);
      this.userResult = await this.submitContestAction({
        enterContestId: this.$route.params.enterContestId,
        userAssignment: this.answered,
      });
      console.log(this.userResult);
      this.resultModalClass.open = true;
    },
    ...contestStore.mapActions({
      setEndContestAction: "setEndContestAction",
      submitContestAction: "submitContestAction",
      getEndTimeOfContestAction: "getEndTimeOfContestAction",
    }),
    ...questionsStore.mapActions({
      getAllQuestionsByEnterContestIdAction:
        "getAllQuestionsByEnterContestIdAction",
      clearStateInfo: "clearStateInfo",
    }),
    handleEndContest() {
      this.$router.push("/");
    },
  },
  async created() {
    // get all questions by contest id (api)
    this.clearStateInfo();
    console.log("--------------------begin--------------");
    console.log(">>>getAllQuestionsByContestIdAction");
    console.log(this.$route.params.enterContestId);
    await this.getAllQuestionsByEnterContestIdAction(
      this.$route.params.enterContestId
    );

    // count dowm

    let end = await this.getEndTimeOfContestAction({
      enterContestId: this.$route.params.enterContestId,
    });
    end = new Date(end.endTime);
    console.log(">>>end");
    console.log(end);
    console.log(">>>enterContestId");
    console.log(this.$route.params.enterContestId);
    this.setEndContestAction(end);

    let distance = this.endContest - new Date();
    if (distance < 0) this.handleEndContest();
    else {
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
          document.querySelector(".count-down").innerHTML = "Hết giờ !";
          setTimeout(this.handleEndContest, 2000);
        }
        distance -= 1000;
      }, 1000);
    }
  },
};
</script>



<style scopted>
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

.result-contest-modal {
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: FaceTopDown ease 0.5s;
}

@keyframes FaceTopDown {
  from {
    opacity: 0;
    transform: translateY(-500px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-contest-container {
  background-color: #ffffff;
  width: 80%;
  min-height: 500px;
  padding: 30px;
}
.modal.open {
  display: flex;
}

.home-page-link {
  text-decoration: underline;
  color: blue;
  font-size: 14px;
  text-align: left;
}
</style>