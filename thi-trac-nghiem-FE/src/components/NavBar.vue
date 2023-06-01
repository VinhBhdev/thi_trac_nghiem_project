<template>
  <nav
    class="navbar navbar-expand-lg navbar-light d-flex d-flex justify-content-between"
    style="background-color: #e3f2fd"
  >
    <div class="d-flex">
      <router-link to="/">
        <img
          src="../../public/images/ptit-logo.png"
          alt=""
          style="height: 40px"
        />
      </router-link>

      <!-- <a class="navbar-brand" href="#">Thi Trắc Nghiệm</a> -->
      <form @submit.prevent="handleSearch" class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Tìm kiếm môn học"
          v-model="courseSearchName"
        />
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
    <div v-if="!user" class="d-flex">
      <div class="">
        <router-link to="/signin"
          ><button class="btn btn-primary">Đăng nhập</button></router-link
        >
      </div>

      <div class="ml-2">
        <router-link to="/signup"
          ><button class="btn btn-primary">Đăng ký</button></router-link
        >
      </div>
    </div>

    <div v-else class="d-flex">
      <div class="dropdown">
        <div
          class="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ user.first_name + " " + user.last_name }}
        </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            v-if="user && user.role == 2"
            class="dropdown-item"
            target="_blank"
            href="/add-questions-list"
            >Thêm câu hỏi</a
          >
          <a
            v-if="user && user.role == 2"
            class="dropdown-item"
            target="_blank"
            href="/admin/add-contest"
            >Quản lý contest</a
          >
          <a
            v-if="user && user.role == 2"
            class="dropdown-item"
            target="_blank"
            href="/admin/manage-subjects"
            >Quản lý môn học</a
          >
          <div class="btn dropdown-item" @click="handleSignout">Đăng xuất</div>
        </div>
      </div>

      <div class="">
        <!-- {{ user.first_name + " " + user.last_name }} -->
        <!-- <span v-if="user && user.role == 2">
          <router-link to="/add-questions-list"
            ><button class="btn btn-primary ml-2 mr-2">
              Thêm câu hỏi
            </button></router-link
          >
        </span> -->
        <!-- <button
          @click="openInNewTab('/admin/manage-subjects')"
          class="btn btn-primary mr-2"
        > -->
        <!-- Quản lý môn học -->
        <!-- </button> -->

        <!-- <button class="btn btn-primary" @click="handleSignout">
          Đăng xuất
        </button> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");

export default {
  data() {
    return {
      courseSearchName: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    ...mapActions({
      setCouseSearchAction: "setCouseSearchAction",
      signoutAction: "signoutAction",
      checkUserLoggedAction: "checkUserLoggedAction",
    }),
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
    handleSearch() {
      this.setCouseSearchAction(this.courseSearchName);
    },
    handleSignout() {
      this.signoutAction();
      this.$router.push("/signin");
    },
    getUserToken() {
      const token = this.$cookies.get("token");
      return token;
    },
  },
  created() {
    const token = this.getUserToken();
    if (token) {
      this.checkUserLoggedAction(token);
    }
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.dropdown {
  margin-right: 60px;
}
</style>