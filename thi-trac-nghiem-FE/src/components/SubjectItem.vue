<template>
  <div class="card text-left">
    <div class="crop">
      <img class="card-img-top" :src="subjectItem.imageLink" alt="" />
    </div>
    <div class="card-body">
      <h4 class="card-title" @click="handleClickBtn">
        {{ subjectItem.subjectName }}
      </h4>
      <p class="card-text subject-desc">{{ subjectItem.subjectDescription }}</p>
      <!-- <button class="btn btn-info" @click="handleClickBtn">Bắt đầu thi</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subjectItem: {
      type: Object,
    },
  },

  methods: {
    handleClickBtn() {
      this.$router.push("/subjects/" + this.subjectItem.id);
    },
  },
};
</script>

<style scopted>
.card-title:hover {
  cursor: pointer;
}
.crop {
  width: 253px;
  height: 142px;
  overflow: hidden;
}

.crop img {
  width: 253px;
  min-height: 142px;
}

.subject-desc {
  max-height: 70px;
}
</style>