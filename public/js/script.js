window.onload = () => {
  const urlInput = document.getElementById("url-input");
  const addForm = document.getElementById("add-form");
  const fetchMsg = document.getElementById("fetch-msg");
  const loginForm = document.getElementById("login-form");
  const user = document.getElementById("user-input");
  const password = document.getElementById("password-input");
  const nbLeads = document.getElementById("leads-counter");
  const userName = document.getElementById("lead-data-username");
  const instaLink = document.getElementById("lead-data-link");
  const createdAt = document.getElementById("lead-data-adding-date");
  const passwordIcon = document.querySelector(".password-img");
  const deleteLeadBtn = document.getElementById("delete-lead-btn");
  const leadStateMsg = document.getElementById("lead-state-msg");

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

  const resetLeadMsg = () => {
    setTimeout(() => {
      leadStateMsg.textContent = "";
      fetchMsg.classList.remove("error-msg");
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

          .then(({ existingLead, leadCounter, lead }) => {
            if (existingLead) {
              fetchMsg.classList.add("active", "error");
              fetchMsg.textContent = "Lead already saved";
            } else {
              fetchMsg.classList.add("active", "confirm");
              fetchMsg.textContent = "Lead saved";
            }

            nbLeads.textContent = leadCounter;
            userName.textContent = lead.userName;
            instaLink.textContent = lead.url;
            createdAt.textContent = lead.createdAt && new Date(lead.createdAt);
            resetForm();
          })
          .catch((error) => {
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

  passwordIcon &&
    passwordIcon.addEventListener("click", (e) => {
      if (password.type === "password") {
        password.type = "text";
        e.target.src = "/assets/img/icons/eye-off.svg";
      } else {
        console.log("test");
        password.type = "password";
        e.target.src = "/assets/img/icons/eye.svg";
      }
    });

  deleteLeadBtn &&
    deleteLeadBtn.addEventListener("click", async () => {
      if (userName.textContent === "") {
        leadStateMsg.classList.add("error-msg");
        leadStateMsg.textContent = "You forgot to select a lead";
        resetLeadMsg();
        return;
      }
      await fetch("/api/lead/" + userName.textContent, { method: "DELETE" })
        .then(async (res) => {
          if (!res.ok && res.status === 400) throw new Error(await res.text());

          return res.json();
        })
        .then(({ msg, leadCounter }) => {
          nbLeads.textContent = leadCounter;
          leadStateMsg.textContent = msg;
          leadStateMsg.classList.add("confirm-msg");
          userName.textContent = "";
          instaLink.textContent = "";
          createdAt.textContent = "";

          setTimeout(() => {
            leadStateMsg.textContent = "";
            leadStateMsg.classList.remove("confirm-msg");
          }, 3000);
        })
        .catch((error) => {
          fetchMsg.classList.add("error-msg");
          leadStateMsg.textContent = JSON.parse(error.message).error;
          resetLeadMsg();
        });
    });
};
