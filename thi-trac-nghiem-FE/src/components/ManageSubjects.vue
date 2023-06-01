<template>
  <div class="manage-subjects container">
    <h4>DANH SÁCH MÔN HỌC</h4>
    <br />
    <button
      @click="openInNewTab(`/admin/add-subject`)"
      class="btn btn-primary mr-2"
    >
      Thêm môn học
    </button>
    <br /><br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Mã môn học</th>
          <th scope="col">Tên môn học</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in subjectsList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ subject.id }}</td>
          <td>{{ subject.subjectName }}</td>
          <td>{{ subject.subjectDescription }}</td>
          <td>
            <div class="actions-subject df">
              <button
                @click="openInNewTab(`/admin/update-subjects/${subject.id}`)"
                class="btn btn-info mr-2"
              >
                Sửa
              </button>
              <button class="btn btn-danger">Xóa</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const subjectsStore = createNamespacedHelpers("subjects");
export default {
  computed: {
    ...subjectsStore.mapState({
      subjectsList: (state) => state.subjectsList,
    }),
  },
  methods: {
    ...subjectsStore.mapActions({
      getAllSubjectsAction: "getAllSubjectsAction",
    }),
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
  },
  async created() {
    await this.getAllSubjectsAction();
  },
};
</script>

<style scopted>
.manage-subjects {
  margin-top: 120px;
}
.info-box {
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  text-align: left;
}

.actions-subject {
  display: flex;
  justify-content: center;
}
</style>