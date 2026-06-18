import { getBasketData } from "@/app/actions/cart";
import { getPackages } from "@/lib/tebex";
import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Cart | NewAge Studios",
};

export default async function CartPage() {
  const basket = await getBasketData();
  const allPackages = await getPackages();
  
  // Exclude packages already in the cart from suggestions
  const basketIds = basket?.packages?.map(p => p.id) || [];
  const suggestedProducts = allPackages.filter(p => !basketIds.includes(p.id));

  return (
    <main className="min-h-screen">
      <CartClient initialBasket={basket} suggestedProducts={suggestedProducts} allPackages={allPackages} />
    </main>
  );
}
