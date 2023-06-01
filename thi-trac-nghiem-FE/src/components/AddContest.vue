<template>
  <div class="add-contest-conta container">
    <div class="message-from-server">
      <div :class="mesageClassObj">{{ messageFromServer }}</div>
    </div>
    <h4>THÊM CONTEST</h4>
    <form @submit.prevent="hanldeAddContest">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"
            >Chọn môn học</label
          >
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="contest.subjectId"
          @change="handleChangeSubject"
        >
          <option selected>--- Chọn môn học ---</option>
          <option
            v-for="(subject, index) in subjectsList"
            :key="index"
            :value="subject.id"
          >
            {{ subject.subjectName }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Tên contest</label>
        <input
          type="text"
          class="form-control"
          v-model="contest.contestName"
          placeholder="Nhập tên contest..."
        />

        <br />
      </div>
      <div class="df">
        <div class="form-group f1">
          <label for="">Mở contest vào lúc</label>
          <input
            type="datetime-local"
            v-model="contest.openContest"
            class="form-control"
          />
        </div>
        <div class="form-group f1">
          <label for="">Đóng contest vào lúc</label>
          <input
            type="datetime-local"
            v-model="contest.closeContest"
            class="form-control"
          />
        </div>
        <div class="form-group f1">
          <label for="">Thời gian làm bài (phút)</label>
          <input
            type="number"
            class="form-control"
            v-model="contest.contestTime"
          />
        </div>
      </div>
      <br /><br />
      <div class="df" style="justify-content: space-between">
        <div class="questions-list-of-content-container">
          DANH SÁCH CÁC CÂU ĐÃ CHỌN
          {{ contest.questionsListOfContest }}
        </div>
        <div class="questions-recommend-search">
          <form
            @submit.prevent="handleSearchRecommendQuestion"
            class="form-inline my-2 my-lg-0"
          >
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchRecommendQuestionsText"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <br />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã câu hỏi</th>

            <th scope="col">
              <div class="dropdown">
                <div
                  class="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Chủ đề
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div
                    v-for="(topic, index) in allTopics"
                    :key="index"
                    class="dropdown-item"
                    href=""
                    @click="handleSearchTopic(`${topic}`)"
                  >
                    {{ topic }}
                  </div>
                </div>
              </div>
            </th>
            <th scope="col">Đề bài</th>
            <th scope="col">Phương án</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(question, index) in recommendQuestionsForContest"
            :key="index"
          >
            <!-- <input type="text" name="" id="" v-model="recommendQuestionsForContest" /> -->
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ question.questionId }}</td>
            <td>{{ question.topic }}</td>
            <td>{{ question.questionText }}</td>
            <td>
              <div
                v-for="(answer, answerIndex) in question.answers"
                :key="answerIndex"
                class="answer"
              >
                <b>{{ String.fromCharCode(answerIndex + 65) }}</b
                >.
                {{ answer.answerText }}
              </div>
            </td>
            <td>
              <input
                type="checkbox"
                name="questionsList"
                class="checkbox-question"
                :value="question.questionId"
                v-model="contest.questionsListOfContest"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" @click="handlePreviousPage" tabindex="-1"
              >Previous</a
            >
          </li>
          <div v-for="(page, index) in numberOfPages" :key="index">
            <li v-if="+page === currentPage" class="page-item active">
              <div class="page-link" @click="handleChangePage(page)">
                {{ page }}
              </div>
            </li>
            <li v-else class="page-item">
              <div class="page-link" @click="handleChangePage(page)">
                {{ page }}
              </div>
            </li>
          </div>

          <!-- <li class="page-item active">
            <a class="page-link" href="#"
              >2 <span class="sr-only">(current)</span></a
            >
          </li> -->
          <li class="page-item">
            <a class="page-link" @click="handleNextPage" tabindex="-1">Next</a>
          </li>
        </ul>
      </nav>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const subjectsStore = createNamespacedHelpers("subjects");
// const contestStore = createNamespacedHelpers("contest");
const addContestStore = createNamespacedHelpers("addContest");
const questionsStore = createNamespacedHelpers("questions");

export default {
  data() {
    return {
      contest: {
        contestName: "",
        openContest: "",
        closeContest: "",
        contestTime: 90,
        subjectId: 0,
        questionsListOfContest: [],
        currentPage: 1,
      },
      messageFromServer: "",
      mesageClassObj: {},
      recommendQuestionsForContest: [],
      searchRecommendQuestionsText: "",
    };
  },
  computed: {
    ...subjectsStore.mapState({
      subjectsList: (state) => state.subjectsList,
    }),
    ...addContestStore.mapGetters({
      getRecommendQuestionsListBySearchText:
        "getRecommendQuestionsListBySearchText",
      getRecommendQuestionsListByTopicSearch:
        "getRecommendQuestionsListByTopicSearch",
      allTopics: "getAllTopics",
      getRecommendQuestions: "getRecommendQuestions",
      numberOfPages: "getNumberOfPages",
    }),
  },
  methods: {
    ...subjectsStore.mapActions({
      getAllSubjectsAction: "getAllSubjectsAction",
    }),
    ...addContestStore.mapActions({
      addContestAction: "addContestAction",
      setRecommendQuestionsListAction: "setRecommendQuestionsListAction",
      setSearchTextAction: "setSearchTextAction",
      setSearchTopicTextAction: "setSearchTopicTextAction",
      setCurrentPageAction: "setCurrentPageAction",
    }),
    ...questionsStore.mapActions({
      getAllQuestionsBySubjectIdAction: "getAllQuestionsBySubjectIdAction",
    }),
    handleSearchRecommendQuestion() {
      console.log("handleSearchRecommendQuestion");
      this.setSearchTextAction(this.searchRecommendQuestionsText);
      this.recommendQuestionsForContest =
        this.getRecommendQuestionsListBySearchText;
    },
    handleSearchTopic(topicText) {
      this.setSearchTopicTextAction(topicText);
      this.recommendQuestionsForContest =
        this.getRecommendQuestionsListByTopicSearch;
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.setCurrentPageAction(page);
      this.recommendQuestionsForContest = this.getRecommendQuestions;
    },
    handleNextPage() {
      if (this.currentPage < this.numberOfPages) {
        this.currentPage++;
        this.handleChangePage(this.currentPage);
      }
    },
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.handleChangePage(this.currentPage);
      }
    },
    async hanldeAddContest() {
      // console.log(this.contest);
      let result = await this.addContestAction(this.contest);
      this.messageFromServer = result.message;
      this.mesageClassObj = {
        alert: true,
        "alert-success": true,
      };
      setTimeout(() => {
        this.messageFromServer = "";
        this.mesageClassObj = {};
      }, 2000);
    },
    async handleChangeSubject() {
      this.recommendQuestionsForContest =
        await this.getAllQuestionsBySubjectIdAction(this.contest.subjectId);
      this.setRecommendQuestionsListAction(this.recommendQuestionsForContest);
      this.recommendQuestionsForContest = this.getRecommendQuestions;
      this.currentPage = 1;
    },
  },
  async created() {
    await this.getAllSubjectsAction();
  },
};
</script>

<style scoped>
.f1 {
  flex: 1;
}
.message-from-server {
  min-height: 40px;
}

label {
  font-weight: 700;
}
.answer {
  text-align: left;
}
.checkbox-question {
  width: 18px;
  height: 18px;
}

.dropdown,
.dropdown-item {
  cursor: pointer;
}
</style>