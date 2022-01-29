"use strict";

import "../styles/popup.css";

(function () {
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  window.onload = function () {
    try {
      chrome.storage.sync.get("user", ({ user }) => {
        if (user !== undefined) {
          window.location.href = "/home.html";
        }
      });
    } catch (error) {
      console.log("Error occured");
    }
  };

  function singInUser() {
    var email = loginEmail.value;
    var password = loginPassword.value;
    fetch("http://localhost:8000/api/signin", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.user);
        var user = JSON.stringify(data.user);
        chrome.storage.sync.set({ user }, function () {
          console.log("Values store success");
          window.location.href = "/home.html";
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", () => {
    singInUser();
  });
})();
