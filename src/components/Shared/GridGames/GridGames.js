import Link from "next/link";
import { map } from "lodash";
import styles from "./GridGames.module.scss";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { Discount } from "../Label/Discount/Discount";
import { ENV } from "@/utils/constants";

export function GridGames(props) {
  const { games } = props;
const imgUrl = `${ENV.SERVER_HOST}`;
  return (
    <div className={styles.gridGames}>
      {map(games, (game) => (
        <Link
          key={game.id}
          href={`/${game.slug}`}
          className={styles.game}
        >
          <div>
            <img src={imgUrl+game.cover.url} />
            {game.discount > 0 && (
              <Discount className={styles.discount}>
                {`-${game.discount}%`}
              </Discount>
            )}
          </div>

          <div>
            <span>{game.title}</span>
            <span className={styles.price}>
              {calcDiscountedPrice(
                game.price,
                game.discount
              )}
              €
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}