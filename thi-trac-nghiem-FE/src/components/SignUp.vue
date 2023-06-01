<template>
  <div class="main">
    <form
      @submit.prevent="handleSubmitSigninForm"
      method="POST"
      class="form"
      id="form-1"
    >
      <h3 class="heading">Đăng ký</h3>
      <p class="desc">Hello ❤️</p>

      <div class="spacer"></div>

      <div class="form-group">
        <label for="first_name" class="form-label">First name</label>

        <input
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Tên của bạn ..."
          class="form-control"
          v-model="userRegister.first_name"
        />

        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="last_name" class="form-label">Last name</label>

        <input
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Tên của bạn ..."
          class="form-control"
          v-model="userRegister.last_name"
        />

        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="username" class="form-label">Tài khoản</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="VD: B20DCCN123"
          class="form-control"
          v-model="userRegister.username"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="form-control"
          v-model="userRegister.password"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password_confirmation" class="form-label"
          >Nhập lại mật khẩu</label
        >
        <input
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Nhập lại mật khẩu"
          type="password"
          class="form-control"
          v-model="userRegister.password_confirmation"
        />
        <span class="form-message"></span>
      </div>

      <div ref="messageFormApi" class="messageFormApi"></div>
      <button class="form-submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");
export default {
  data() {
    return {
      userRegister: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    ...mapActions({
      postSignupAction: "postSignupAction",
    }),
    async handleSubmitSigninForm() {
      let message = await this.postSignupAction(this.userRegister);
      if (message === "Đăng ký thành công") this.$router.push("courses");
      else this.$refs.messageFormApi.innerHTML = message;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  color: #333;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
}
.main {
  background: #f1f1f1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.form {
  width: 360px;
  min-height: 100px;
  padding: 32px 24px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  margin: 24px;
  align-self: center;
  box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
}
.form .heading {
  font-size: 24px;
}
.form .desc {
  text-align: center;
  color: #636d77;
  font-size: 14px;
  font-weight: lighter;
  line-height: 14px;
  margin-top: 12px;
  margin-bottom: 12px;
  font-weight: 300;
}

.form-group {
  display: flex;
  margin-bottom: 12px;
  flex-direction: column;
}

.form-label,
.form-message {
  text-align: left;
}

.form-label {
  font-weight: 700;
  padding-bottom: 6px;
  line-height: 1.8rem;
  font-size: 14px;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
}

.form-control:hover {
  border-color: #1dbfaf;
}

.form-group.invalid .form-control {
  border-color: #f33a58;
}

.form-group.invalid .form-message {
  color: #f33a58;
}

.form-message {
  font-size: 14px;
  line-height: 1.6rem;
  padding: 4px 0 0;
}

.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #1ac7b6;
}

.spacer {
  margin-top: 8px;
}

.messageFormApi {
  min-height: 24px;
}
</style>