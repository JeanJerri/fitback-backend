export const isValidPassword = (password) => {
  const minLength = /.{8,}/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;

  const errors = [];
  if (!minLength.test(password)) {
    errors.push("Senha deve ter no mínimo 8 caracteres.");
  }

  if (!hasLowercase.test(password)) {
    errors.push("Senha deve conter pelo menos uma letra minúscula.");
  }

  if (!hasUppercase.test(password)) {
    errors.push("Senha deve conter pelo menos uma letra maiúscula.");
  }

  if (!hasSpecialChar.test(password)) {
    errors.push("Senha deve conter pelo menos um caractere especial.");
  }

  return errors;
};
