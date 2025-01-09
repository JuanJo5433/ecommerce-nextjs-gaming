// Resume.js
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import styles from "./Resume.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { Order } from "@/api/order"; // Importa la clase Order

const orderCtrl = new Order(); // Instancia de la clase Order

export function Resume(props) {
  const { games, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    // Calculamos el total sumando el precio de los juegos con descuento
    forEach(games, (game) => {
      const price = calcDiscountedPrice(game.price, game.discount);
      totalTemp += price * game.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [games]);

  const onPay = async () => {
    setLoading(true);
  console.log(games)
    // Creamos el objeto con los datos de la orden
    const orderData = {
      userId: user.id, // ID del usuario
      items: games.map((game) => ({
        gameId: game.id, // ID del juego
        title: game.title, // Título del juego
        platform: game.platform.title, // Plataforma del juego
        quantity: game.quantity, // Cantidad de ese juego
        price: calcDiscountedPrice(game.price, game.discount), // Precio con descuento
        originalPrice: game.price, // Precio original del juego
        discount: game.discount, // Descuento aplicado
        // Otros datos que puedan ser relevantes
        description: game.description, // Descripción del juego
        cover: game.cover.url, // URL de la imagen del juego
      })),
      totalAmount: total, // Total de la orden
      address: addressSelected, // Dirección seleccionada
      paymentId: "44", // El ID del pago, asigna este valor adecuadamente
    };
  
    try {
      // Guardamos la orden sin importar el resultado
      await orderCtrl.saveOrder(orderData);
      // Limpiamos el carrito
      deleteAllItems();
      // Redirigimos al paso final
      goToStepEnd();
    } catch (error) {
      console.error("Error al guardar la orden:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div key={game.id} className={styles.product}>
              <div>
                <p>{game.title}</p>
                <span>{game.platform.title}</span>
              </div>
              <span>
                {game.quantity > 0 && `${game.quantity}x`}
                {calcDiscountedPrice(game.price, game.discount)} €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
