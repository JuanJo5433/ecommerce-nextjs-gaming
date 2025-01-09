import { useState } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import styles from "./Panel.module.scss";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { useCart } from "@/hooks/useCart";
import { WishlistIcon } from "@/components/Shared/WishlistIcon/WishlistIcon";
import { ENV } from "@/utils/constants";

export function Panel(props) {
    const { gameId, game } = props;
    const [loading, setLoading] = useState(false);
    const { addCart } = useCart();

    const buyPrice = calcDiscountedPrice(game.price, game.discount);

    const addCartWrapper = () => {
        setLoading(true);
        addCart(gameId);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <Container className={styles.panel}>
            <div className={styles.imgContiner}>
                <Image src={ENV.SERVER_HOST + game.cover.url} />
            </div>

            <div className={styles.actionsContainer}>
                <div>
                    <h2>{game.title}</h2>

                    <div className={styles.moreInfo}>
                        <span>
                            <Image
                                src={ENV.SERVER_HOST + game.platform.icon.url}
                            />
                            {game.title}
                        </span>
                        <span>
                            <Icon name="check" />
                            En stock
                        </span>
                    </div>

                    <div className={styles.price}>
                        {game.discount > 0 && (
                            <>
                                <span className={styles.originalPrice}>
                                    <Icon name="tag" />
                                    {game.price}€
                                </span>

                                <span className={styles.discount}>
                                    -{game.discount}%
                                </span>
                            </>
                        )}

                        <span className={styles.price}>{buyPrice}€</span>
                    </div>

                    <Button
                        primary
                        fluid
                        onClick={addCartWrapper}
                        loading={loading}
                    >
                        Comprar ahora
                    </Button>

                    <WishlistIcon gameId={gameId} className={styles.heart} />
                </div>
            </div>
        </Container>
    );
}
