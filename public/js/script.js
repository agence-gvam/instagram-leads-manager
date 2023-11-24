window.onload = () => {
  const urlInput = document.getElementById("url-input");
  const addForm = document.getElementById("add-form");
  const fetchMsg = document.getElementById("fetch-msg");
  const loginForm = document.getElementById("login-form");
  const user = document.getElementById("user-input");
  const password = document.getElementById("password-input");
  const nbProspect = document.getElementById("prospect-counter");

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

  (async () => {
    await fetch("/api/prospect", fetchOptions("GET", undefined))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then(({ prospectCounter }) => {
        nbProspect.textContent = prospectCounter;
      })
      .catch((error) => console.log(error));
  })();

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

        .then(({ isProspect, prospectCounter }) => {
          console.log(isProspect);
          console.log(prospectCounter);
          nbProspect.textContent = prospectCounter;
          if (isProspect) {
            fetchMsg.classList.add("active", "error");
            fetchMsg.textContent = "Prospecté déjà enregistré";
          } else {
            fetchMsg.classList.add("active", "confirm");
            fetchMsg.textContent = "Prospecté enregistré";
          }
          setTimeout(() => {
            fetchMsg.classList.remove("error", "confirm", "active");
            fetchMsg.textContent = "";
            urlInput.value = "";
          }, 5000);
        })
        .catch((error) => {
          fetchMsg.classList.add("active", "error");
          fetchMsg.textContent = error;
          setTimeout(() => {
            fetchMsg.classList.remove("error", "success");
            fetchMsg.textContent = "";
            urlInput.value = "";
          }, 5000);
        });
    });

  loginForm &&
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const body = { user: user.value, password: password.value };

      await fetch("/api/auth", fetchOptions("POST", body))
        .then((res) => {
          console.log(res);
          if (res.redirected) window.location.href = res.url;
        })
        .catch((error) => console.log(error));
    });
};
