const aes256 = require("aes256");

export const encryptValues = (key, value) => {
  return aes256.encrypt(key, value);
};

export const decryptValues = (key, value) => {
  return aes256.decrypt(key, value);
};

export const generateInputPassword = (isNumbersSelected, isSymbolsSelected) => {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "123456789";
  const symbols = "!@#$%^&*=_";

  let characters = alphabets;

  if (isNumbersSelected) {
    characters += numbers;
  }
  if (isSymbolsSelected) {
    characters += symbols;
  }

  let password = "";
  for (let i = 0; i < 12; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
};
