window.onload = () => {
  const urlInput = document.getElementById("url-input");
  const addForm = document.getElementById("add-form");
  const confirmMsg = document.getElementById("confirm-msg");
  const errorMsg = document.getElementById("error-msg");
  const loginForm = document.getElementById("login-form");
  const user = document.getElementById("user-input");
  const password = document.getElementById("password-input");

  const fetchOptions = (method, body) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    return options;
  };

  addForm &&
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = { url: urlInput.value };

      await fetch("/api/prospect", fetchOptions("POST", body))
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
          }
          return res.json();
        })
        .then(({ isProspect }) => {
          console.log(isProspect);
          if (isProspect) {
            errorMsg.classList.add("active");
            confirmMsg.classList.remove("active");
          } else {
            errorMsg.classList.remove("active");
            confirmMsg.classList.add("active");
          }
        })
        .catch((error) => console.log(error));
    });

  loginForm &&
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const body = { user: user.value, password: password.value };

      await fetch("/api/auth", fetchOptions("POST", body))
        .then((res) => {
          console.log(res);
          if (res.redirected) window.location.href = res.url;
          // console.log("Redirigé :", res.redirected);
          // console.log(res);
          // if (!res.ok) {
          //   throw new Error(`Erreur HTTP : ${res.status}`);
          // }
          // return res.json();
        })
        // .then((data) => {
        //   console.log(data);
        // })
        .catch((error) => console.log(error));
    });
};
