window.onload = () => {
  const urlInput = document.getElementById("url-input");
  const addForm = document.getElementById("add-form");
  const fetchMsg = document.getElementById("fetch-msg");
  const loginForm = document.getElementById("login-form");
  const user = document.getElementById("user-input");
  const password = document.getElementById("password-input");
  const nbLeads = document.getElementById("leads-counter");

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
    await fetch("/api/lead", fetchOptions("GET", undefined))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then(({ leadCounter }) => {
        nbLeads.textContent = leadCounter;
      })
      .catch((error) => console.log(error));
  })();

  const resetForm = () => {
    setTimeout(() => {
      fetchMsg.classList.remove("error", "confirm", "active");
      fetchMsg.textContent = "";
      urlInput.value = "";
    }, 3000);
  };

  addForm &&
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!urlInput.value || urlInput.value === "") {
        fetchMsg.classList.add("active", "error");
        fetchMsg.textContent = "You must fill the input";
        resetForm();
      } else {
        const body = { url: urlInput.value };
        await fetch("/api/lead", fetchOptions("POST", body))
          .then(async (res) => {
            if (!res.ok && res.status === 400)
              throw new Error(await res.text());

            return res.json();
          })

          .then(({ isLead, leadCounter }) => {
            console.log(isLead);
            console.log(leadCounter);
            nbLeads.textContent = leadCounter;
            if (isLead) {
              fetchMsg.classList.add("active", "error");
              fetchMsg.textContent = "Lead already saved";
            } else {
              fetchMsg.classList.add("active", "confirm");
              fetchMsg.textContent = "Lead saved";
            }
            resetForm();
          })
          .catch((error) => {
            console.log(JSON.parse(error.message).error);
            fetchMsg.classList.add("active", "error");
            fetchMsg.textContent = JSON.parse(error.message).error;
            resetForm();
          });
      }
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
