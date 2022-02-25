import {
  encryptValues,
  decryptValues,
  generateInputPassword,
} from "./utils/utils";

(function () {
  const passwordBtn = document.getElementById("password-btn");
  const submitBtn = document.getElementById("submit-btn");
  const passwordNumber = document.getElementById("password-list-number");
  const passwordSymbol = document.getElementById("password-list-symbol");
  const passwordInput = document.getElementById("password-body-input");
  const passwordInputUrl = document.getElementById("password-body-url");
  const passwordInputEmail = document.getElementById("password-body-email");
  const passwordInputName = document.getElementById("password-body-name");

  function createNewPasswordVault() {
    let enryptedPasswordList = {
      sitePassword: passwordInput.value,
      siteUrl: passwordInputUrl.value,
      siteUsername: passwordInputEmail.value,
      vaultName: passwordInputName.value,
    };

    chrome.storage.sync.get("user", ({ user }) => {
      var user = JSON.parse(user);
      for (const [key, value] of Object.entries(enryptedPasswordList)) {
        let encryptedValue =
          key !== "siteUrl" ? encryptValues(user._id, value) : value;
        enryptedPasswordList[key] = encryptedValue;
      }

      fetch(
        `https://epassbackend.herokuapp.com/api/password/create/${user._id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(enryptedPasswordList),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Password saved in vault");

          passwordInput.value = "";
          passwordInputUrl.value = "";
          passwordInputEmail.value = "";
          passwordInputName.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  submitBtn.addEventListener("click", () => {
    createNewPasswordVault();
  });

  passwordBtn.addEventListener("click", () => {
    passwordInput.value = generateInputPassword(
      passwordNumber.checked,
      passwordSymbol.checked
    );
  });
})();
