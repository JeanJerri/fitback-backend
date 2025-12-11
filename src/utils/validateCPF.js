export function isValidCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  return digits.length === 11;
}
