import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CartLayout } from "@/layouts/CartLayout/CartLayout";
import { useCart } from "@/hooks/useCart";
import { Cart } from "@/components/Cart";
import { Game } from "@/api/game";
import { Seo } from "@/components/Shared/Seo/Seo";

const gameCtrl = new Game();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [games, setGames] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    if (cart && cart.length > 0) {
      (async () => {
        try {
          const fetchedGames = await Promise.all(cart.map(async (item) => {
          
            const response = await gameCtrl.getGameById(item.id);
            return { ...response.data, quantity: item.quantity };
          }));
          setGames(fetchedGames);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      })();
    }
  }, [cart]);
  


  return (
    <>
      <Seo title="Carrito" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne games={games} />}
        {currentStep === 2 && <Cart.StepTwo games={games} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}
