import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import styles from "./Basket.module.scss";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { useCart } from "@/hooks/useCart";
import { ENV } from "@/utils/constants";

export function Basket(props) {
  const { games } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(games, (game) => (
          <div key={game.id} className={styles.product}>
            <Image src={ENV.SERVER_HOST+ game.cover.url} />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{game.title}</p>
                  <p>{game.platform.title}</p>
                </div>

                <Icon
                  name="trash alternate"
                  link
                  onClick={() => deleteItem(game.documentId)}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={game.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(game.documentId, data.value)
                  }
                />
                <span>
                  {calcDiscountedPrice(
                    game.price,
                    game.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
