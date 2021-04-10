export function formatDateToLocaleString(str) {
  if (!str) return '';
  let data = new Date(str);

  return `${('00' + data.getUTCDate()).slice(-2)}/${(
    '00' +
    (data.getUTCMonth() + 1)
  ).slice(-2)}/${data.getUTCFullYear()}`;
}

export function formatDateBR(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

export function formatDateUS(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('fr-ca', { timeZone: 'UTC' });
}
