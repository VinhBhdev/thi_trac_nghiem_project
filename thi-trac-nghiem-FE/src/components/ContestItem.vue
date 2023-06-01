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
        <div class="f2">
          <div :class="{ 'count-down-begin-contest': true }"></div>
          <button
            v-if="isBegin"
            class="btn btn-primary"
            @click="handleStartContest"
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBegin: false,
    };
  },
  methods: {
    handleStartContest() {
      this.$router.push(`/contests/${this.contestItem.id}`);
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

  created() {
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
        this.isBegin = true;
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