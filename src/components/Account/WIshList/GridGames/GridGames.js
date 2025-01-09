import Link from "next/link";
import { map } from "lodash";
import styles from "./GridGames.module.scss";
import { Discount } from "@/components/Shared/Label/Discount/Discount";
import { WishlistIcon } from "@/components/Shared/WishlistIcon/WishlistIcon";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { ENV } from "@/utils/constants";

export function GridGames(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.gridGames}>
      {map(wishlist, (item) => {

     
    
      

        return (
          <div key={item.id} className={styles.game}>
            <Link href={`/${item.game.slug}`}>
              <div>
                <img src={ENV.SERVER_HOST + item.game.cover.url} />

                {item.game.discount > 0 && (
                  <Discount className={styles.discount}>
                    {`-${item.game.discount}%`}
                  </Discount>
                )}
              </div>

              <div>
                <span>{item.game.title}</span>
                <span className={styles.price}>
                  {calcDiscountedPrice(
                    item.game.price,
                    item.game.discount
                  )}
                  €
                </span>
              </div>
            </Link>

            <WishlistIcon
              gameId={item.game.id}
              className={styles.whislistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}
