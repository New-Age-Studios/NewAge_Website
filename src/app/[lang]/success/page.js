import { getDictionary } from "@/dictionaries";
import SuccessClient from "./SuccessClient";

export default async function SuccessPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { lang } = params;
  const dict = await getDictionary(lang);

  const transactionId =
    searchParams?.["tbx-id"] ||
    searchParams?.txnId ||
    searchParams?.transaction_id ||
    null;

  const t = dict.success || {
    title: "Order Complete!",
    subtitle: "Thank you! Your products are now available in your Portal Account.",
    itemsPurchased: "ITEMS PURCHASED",
    transactionId: "TRANSACTION ID",
    orderSummary: "ORDER SUMMARY",
    subtotal: "Subtotal",
    salesTax: "Sales Tax",
    total: "Total",
    downloadAssets: "Download Assets",
    continueShopping: "Continue Shopping",
    discord: "Discord",
    noItems: "No items to display.",
  };

  return <SuccessClient lang={lang} t={t} transactionId={transactionId} />;
}
