<template>
  <div class="contest-item-container">
    <div class="info-box">
      <h4 class="text-left">{{ contestItemForAdmin.contestName }}</h4>
      <div class="df">
        <div class="f10">
          <b>Mở contest: {{ dateToString(contestItemForAdmin.openContest) }}</b
          ><br />
          <b
            >Đóng contest:
            {{ dateToString(contestItemForAdmin.closeContest) }}</b
          ><br />
          <b>Thời gian làm bài: {{ contestItemForAdmin.contestTime }}ph</b
          ><br />
          <b>Trạng thái: </b>
          <b
            v-if="contestItemForAdmin.status == 'Đã kết thúc'"
            style="color: red"
          >
            Đã kết thúc
          </b>
          <b
            v-else-if="contestItemForAdmin.status == 'Đang diễn ra'"
            style="color: green"
          >
            {{ contestItemForAdmin.status }}
          </b>
          <b v-else style="color: blue">{{ contestItemForAdmin.status }}</b>
        </div>
        <div class="f4">
          <button class="btn btn-success" @click="handleWatchRankTable">
            Xem BXH
          </button>
          <button class="btn btn-primary ml-1" @click="redirectUpdateContest">
            Sửa
          </button>
          <button class="btn btn-danger ml-1">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contestItemForAdmin: {
      type: Object,
    },
    contestIndex: {
      type: Number,
    },
  },
  methods: {
    dateToString(date) {
      let result = new Date(date);
      return result.toUTCString().slice(0, -3);
    },
    handleWatchRankTable() {
      let contestId = this.contestItemForAdmin.id;
      this.$router.push("/contest/contest-rank/" + contestId);
    },
    redirectUpdateContest() {
      let contestId = this.contestItemForAdmin.id;
      this.$router.push("/admin/update-contest/" + contestId);
    },
  },
  created() {
    console.log(this.contestItemForAdmin);
  },
};
</script>

<style scoped>
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

.f4 {
  flex: 4;
}

.f10 {
  flex: 10;
}
</style>