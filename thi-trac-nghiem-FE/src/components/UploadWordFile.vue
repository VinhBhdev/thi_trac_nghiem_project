<template>
  <div class="">
    <form id="uploadForm">
      <input type="file" id="myFiles" accept=".docx" multiple />
      <button>Submit</button>
    </form>
    <h2></h2>
    <h3></h3>
  </div>
</template>

<script>
export default {
  async mounted() {
    const form = document.querySelector("#uploadForm");

    const sendFiles = async () => {
      // Object
      const myFiles = document.getElementById("myFiles").files;

      const formData = new FormData();

      Object.keys(myFiles).forEach((key) => {
        formData.append(myFiles.item(key).name, myFiles.item(key));
      });

      const response = await fetch(
        "http://localhost:3000/api/v1/admin/upload/10",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await response.json();

      const h2 = document.querySelector("h2");
      h2.textContent = `Status: ${json?.status}`;

      const h3 = document.querySelector("h3");
      h3.textContent = json?.message;

      console.log(json);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendFiles();
    });
  },
};
</script>

<style>
</style>