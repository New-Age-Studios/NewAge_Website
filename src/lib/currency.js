export async function getExchangeRates() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch rates");
    const data = await res.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Fallback rates in case the API goes down
    return {
      USD: 1,
      BRL: 5.5,
      EUR: 0.95,
      GBP: 0.8,
      CAD: 1.4,
      AUD: 1.5,
    };
  }
}

export const currencies = [
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
  { code: "BRL", symbol: "R$", flag: "🇧🇷", name: "Brazilian Real" },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "British Pound" },
  { code: "CAD", symbol: "C$", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: "Australian Dollar" },
];

export function getCurrencyData(code) {
  return currencies.find((c) => c.code === code) || currencies[0];
}

export function formatCurrency(amountUSD, currencyCode, rates) {
  if (!amountUSD) return getCurrencyData(currencyCode).symbol + "0";
  
  const rate = rates[currencyCode] || 1;
  const convertedAmount = amountUSD * rate;
  
  const currencyData = getCurrencyData(currencyCode);
  
  // Format with 2 decimal places, or 0 if whole number
  const formattedAmount = Number.isInteger(convertedAmount) 
    ? convertedAmount.toString() 
    : convertedAmount.toFixed(2);
    
  return `${currencyData.symbol}${formattedAmount}`;
}
