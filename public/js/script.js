window.onload = () => {
  //   const { axios } = require("axios");
  const addForm = document.getElementById("add-form");
  //   const addInput = document.getElementById("url-input");

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // axios
    //   .post(process.env.SERVER_URL + "/api/prospect", { url: addInput.value })
    //   .then((res) => {
    //     console.log(res.data);
    //     addInput.value = "";
    //   })
    //   .catch((error) => console.log(error));
  });
};
