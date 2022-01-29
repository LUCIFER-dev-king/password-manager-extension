import { encryptValues, decryptValues } from "./utils/utils";

const homeEmail = document.getElementById("home-email-item");
const homePassword = document.getElementById("home-password-item");
const homeAvailable = document.querySelector(".home-available");
const homeNone = document.querySelector(".home-password-none");

const getCurrentTabPassword = (id, url) => {
  fetch(`http://localhost:8000/api/password/${id}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ siteUrl: url }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      let email = decryptValues(id, data.password.siteUsername);
      let password = decryptValues(id, data.password.sitePassword);

      homeEmail.innerHTML = email;
      homePassword.innerHTML = password;
      homeAvailable.classList.toggle("active");
    })
    .catch((error) => {
      console.error("Error:", error);
      homeNone.classList.toggle("active");
    });
};

function getCurrentTab(id) {
  let queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (result) => {
    getCurrentTabPassword(id, result[0].url);
    console.log(result[0].url);
  });
}

window.onload = function () {
  try {
    chrome.storage.sync.get("user", ({ user }) => {
      const { _id } = JSON.parse(user);
      getCurrentTab(_id);
    });
  } catch (error) {
    console.log("Error occured");
  }
};
