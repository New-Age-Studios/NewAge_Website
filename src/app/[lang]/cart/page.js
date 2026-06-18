import { getBasketData } from "@/app/actions/cart";
import { getPackages } from "@/lib/tebex";
import CartClient from "@/components/CartClient";
import { getDictionary } from "@/dictionaries";

export const metadata = {
  title: "Cart | NewAge Studios",
};

export default async function CartPage({ params }) {
  const { lang } = await params;
  const basket = await getBasketData();
  const allPackages = await getPackages();
  const dict = await getDictionary(lang);
  
  // Exclude packages already in the cart from suggestions
  const basketIds = basket?.packages?.map(p => p.id) || [];
  const suggestedProducts = allPackages.filter(p => !basketIds.includes(p.id));

  return (
    <main className="min-h-screen">
      <CartClient initialBasket={basket} suggestedProducts={suggestedProducts} allPackages={allPackages} dict={dict.cart} lang={lang} />
    </main>
  );
}
