<template>
  <div class="add-subject-container container" style="margin-top: 120px">
    <div class="message-from-server">
      <div :class="mesageClassObj">{{ messageFromServer }}</div>
    </div>
    <h4>CẬP NHẬT MÔN HỌC</h4>
    <form @submit.prevent="handleAddSubject">
      <div class="form-group">
        <label for="">Tên môn học</label>
        <input
          type="text"
          class="form-control"
          v-model="subject.subjectName"
          placeholder="Nhập tên môn học..."
        />
      </div>
      <div class="form-group">
        <label for="">Mô tả môn học</label>
        <input
          type="text"
          class="form-control"
          v-model="subject.subjectDescription"
          placeholder="Mô tả môn học..."
        />
      </div>
      <div class="form-group">
        <label for="">Hình ảnh</label>
        <input
          type="text"
          class="form-control"
          v-model="subject.imageLink"
          placeholder="Nhập link ảnh"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("subjects");
export default {
  data() {
    return {
      subject: {
        subjectName: "",
        subjectDescription: "",
        imageLink: "",
      },
      messageFromServer: "",
      mesageClassObj: {},
    };
  },
  computed: {
    ...mapState({
      subjectsList: (state) => state.subjectsList,
    }),
  },
  methods: {
    ...mapActions({
      getAllSubjectsAction: "getAllSubjectsAction",
      updateSubjectAction: "updateSubjectAction",
    }),
    async handleAddSubject() {
      //   alert(this.subject);
      const result = await this.updateSubjectAction(this.subject);
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
  },
  async created() {
    await this.getAllSubjectsAction();
    this.subject = this.subjectsList.find(
      (item) => item.id == this.$route.params.subjectId
    );
    console.log(this.subject);
  },
};
</script>

<style scoped>
.form-group {
  text-align: left;
  margin-bottom: 28px;
}
.message-from-server {
  min-height: 40px;
}

label {
  font-weight: 700;
}
</style>