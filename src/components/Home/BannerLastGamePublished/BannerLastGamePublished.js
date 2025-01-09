import { useEffect, useState } from "react";
import styles from "./BannerLastGamePublished.module.scss";
import { Game } from "@/api/game";
import { Container, Image } from "semantic-ui-react";
import { ENV } from "@/utils/constants";
import Link from "next/link";
import { DateTime } from "luxon";
import { calcDiscountedPrice } from "@/utils/functions/calcDiscountedPrice";
import { Discount } from "@/components/Shared/Label/Discount/Discount";

const gameCtrl = new Game();

export function BannerLastGamePublished() {
    const [game, setGame] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await gameCtrl.getLastPublished();
                setGame(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (!game) return null;

    const wallpaper = `${ENV.SERVER_HOST}${game.wallpaper.url}`;
    const releaseDate = new Date(game.releaseDate).toISOString();
    const price = calcDiscountedPrice(game.price, game.discount);

    return (
        <div className={styles.container}>
            <Image src={wallpaper} className={styles.wallpaper} />

            <Link className={styles.infoContainer} href={game.slug}>
                <Container>
                    <span className={styles.date}>
                        {DateTime.fromISO(releaseDate)
                            .minus({ days: 1 })
                            .toRelative()}
                    </span>

                    <h2>{game.title}</h2>
                    <p className={styles.price}>

                        <Discount >-{game.discount}%</Discount>
                        <span className={styles.finalPrice}>{price}</span>
                    </p>
                </Container>
            </Link>
        </div>
    );
}
