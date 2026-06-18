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
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr.", flag: "🇨🇭", name: "Swiss Franc" },
  { code: "CLP", symbol: "$", flag: "🇨🇱", name: "Chilean Peso" },
  { code: "CNY", symbol: "¥", flag: "🇨🇳", name: "Chinese Yuan" },
  { code: "COP", symbol: "$", flag: "🇨🇴", name: "Colombian Peso" },
  { code: "CZK", symbol: "Kč", flag: "🇨🇿", name: "Czech Koruna" },
  { code: "DKK", symbol: "kr", flag: "🇩🇰", name: "Danish Krone" },
  { code: "EGP", symbol: "£", flag: "🇪🇬", name: "Egyptian Pound" },
  { code: "HKD", symbol: "HK$", flag: "🇭🇰", name: "Hong Kong Dollar" },
  { code: "HUF", symbol: "Ft", flag: "🇭🇺", name: "Hungarian Forint" },
  { code: "IDR", symbol: "Rp", flag: "🇮🇩", name: "Indonesian Rupiah" },
  { code: "ILS", symbol: "₪", flag: "🇮🇱", name: "Israeli New Shekel" },
  { code: "INR", symbol: "₹", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "MXN", symbol: "$", flag: "🇲🇽", name: "Mexican Peso" },
  { code: "MYR", symbol: "RM", flag: "🇲🇾", name: "Malaysian Ringgit" },
  { code: "NOK", symbol: "kr", flag: "🇳🇴", name: "Norwegian Krone" },
  { code: "NZD", symbol: "NZ$", flag: "🇳🇿", name: "New Zealand Dollar" },
  { code: "PHP", symbol: "₱", flag: "🇵🇭", name: "Philippine Peso" },
  { code: "PLN", symbol: "zł", flag: "🇵🇱", name: "Polish Złoty" },
  { code: "RON", symbol: "lei", flag: "🇷🇴", name: "Romanian Leu" },
  { code: "SEK", symbol: "kr", flag: "🇸🇪", name: "Swedish Krona" },
  { code: "SGD", symbol: "S$", flag: "🇸🇬", name: "Singapore Dollar" },
  { code: "THB", symbol: "฿", flag: "🇹🇭", name: "Thai Baht" },
  { code: "TRY", symbol: "₺", flag: "🇹🇷", name: "Turkish Lira" },
  { code: "ZAR", symbol: "R", flag: "🇿🇦", name: "South African Rand" },
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
