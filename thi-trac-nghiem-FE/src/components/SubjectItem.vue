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
import { createNamespacedHelpers } from "vuex";
const authStore = createNamespacedHelpers("auth");
export default {
  props: {
    subjectItem: {
      type: Object,
    },
  },
  computed: {
    ...authStore.mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    handleClickBtn() {
      console.log(this.user);
      if (this.user.role === 1)
        this.$router.push("/subjects/" + this.subjectItem.id);
      else
        this.$router.push(
          "/admin/all-contests-for-admin/subjects/" + this.subjectItem.id
        );
    },

    ...authStore.mapActions({
      checkUserLoggedAction: "checkUserLoggedAction",
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
    }
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