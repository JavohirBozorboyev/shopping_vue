export const FormatCurrency = (amount, currency) => {
  if (!currency) return "";
  return new Intl.NumberFormat(currency, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
