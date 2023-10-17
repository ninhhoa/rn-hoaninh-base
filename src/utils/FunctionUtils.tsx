export const formatCurrency = (number: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
};

export const formatNumber = (number: number): string => {
  if (!number || number === 0) return "0";

  return number.toLocaleString("en-US");
};
