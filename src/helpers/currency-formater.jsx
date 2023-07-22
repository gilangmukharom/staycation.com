import currency from "currency.js";

export const currencyRupiah = (value) => {
  return currency(value, {
    symbol: "Rp ",
    decimal: ",",
    separator: ".",
    presicion: 0,
    formatWithSymbol: true,
  }).format();
};
