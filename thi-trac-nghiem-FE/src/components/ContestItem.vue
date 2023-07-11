<template>
  <div class="contest-item-container">
    <div class="info-box">
      <h4 class="text-left">{{ contestItem.contestName }}</h4>
      <div class="df">
        <div class="f10">
          <b>Mở contest: {{ dateToString(contestItem.openContest) }}</b
          ><br />
          <b>Đóng contest: {{ dateToString(contestItem.closeContest) }}</b
          ><br />
          <!-- <input
            readonly
            type="datetime-local"
            name=""
            id=""
            v-model="myTime"
          /> -->
          <b>Thời gian làm bài: {{ contestItem.contestTime }}ph</b>
        </div>
        <div class="" style="flex: 4">
          <div :class="{ 'count-down-begin-contest': true }"></div>
          <button class="btn btn-success mr-2" @click="handleWatchRankTable">
            Xem BXH
          </button>
          <button
            v-show="contestItem.status === 'chua lam'"
            class="btn btn-primary"
            @click="handleStartContest"
          >
            Bắt đầu
          </button>
          <button
            v-show="contestItem.status === 'dang lam'"
            class="btn btn-info"
            @click="handleContinueContest"
          >
            Tiếp tục
          </button>
          <button
            disabled
            v-show="contestItem.status === 'da ket thuc'"
            class="btn btn-secondary"
          >
            Đã hoàn thành
          </button>
        </div>
        <!-- <div class="f2">
          <div :class="{ 'count-down-begin-contest': true }"></div>
          <button
            v-if="contestItem.status === 'da lam'"
            class="btn btn-info"
            @click="handleContinueContest"
          >
            Tiếp tục
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const contestStore = createNamespacedHelpers("contest");
// const authStore = createNamespacedHelpers("auth");
export default {
  data() {
    return {
      contestStatus: -1,
      enterContestId: "",
    };
  },
  computed: {},
  methods: {
    ...contestStore.mapActions({
      enterContestAction: "enterContestAction",
      getContestStatusAction: "getContestStatusAction",
    }),
    async handleStartContest() {
      let enterContestInfo = await this.enterContestAction({
        participationId: this.contestItem.participationId,
        startTime: new Date(),
      });
      this.enterContestId = enterContestInfo.data.id;
      this.$router.push(`/enter-contest/${this.enterContestId}`);
    },
    handleContinueContest() {
      this.$router.push(`/enter-contest/${this.contestItem.enterContestId}`);
    },
    handleWatchRankTable() {
      this.$router.push(`/contest/contest-rank/${this.contestItem.id}`);
    },
    getOpenContestTime() {
      return this.contestItem.openContest;
    },
    updateTimeZonePlus7(date) {
      return new Date(date.valueOf() + 25200000);
    },
    dateToString(date) {
      let result = new Date(date);
      return result.toUTCString().slice(0, -3);
    },
  },
  props: {
    contestItem: {
      type: Object,
    },
    contestIndex: {
      type: Number,
    },
  },

  async created() {
    let x = setInterval(() => {
      let distance =
        new Date(this.contestItem.openContest) -
        this.updateTimeZonePlus7(new Date());
      // console.log(distance);
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let countDownElement = document.querySelectorAll(
        ".count-down-begin-contest"
      )[this.contestIndex];
      if (countDownElement) {
        countDownElement.innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
      if (distance < 0 && countDownElement) {
        clearInterval(x);
        countDownElement.innerHTML = "";
        this.contestStatus = 1;
      }
      distance -= 1000;
    }, 1000);
  },
};
</script>

<style scopted>
.info-box {
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  text-align: left;
}

.df {
  display: flex;
}

.f2 {
  flex: 2;
}

.f10 {
  flex: 10;
}
</style>