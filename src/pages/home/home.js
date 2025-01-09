import { Home } from "@/components/Home";
import { LatestGames } from "@/components/Home/LatestGames/LatestGames";
import { BannerAd } from "@/components/Shared/BannerAd/BannerAd";
import { BarTrust } from "@/components/Shared/BarTrust/BarTrust";
import { Seo } from "@/components/Shared/Seo/Seo";
import { Separator } from "@/components/Shared/Separator/Separator";
import { BasicLayout } from "@/layouts/BasicLayout";
import { Container } from "semantic-ui-react";

const platformsId = {
    playstation: 2,
    xbox: 4,
    nintendo: 6,
    pc: 8,
};

export default function HomePage() {
    return (
        <>
        <Seo/>
            <BasicLayout>
                <Home.BannerLastGamePublished />
                <Separator height={100} />
                <Container>
                    <LatestGames title="Ultimos lanzamientos" />
                </Container>
                <Separator height={100} />
                <BarTrust />
                <Separator height={100} />
                <Container>
                    <LatestGames
                        title="PlayStation"
                        limit={3}
                        platformId={platformsId.playstation}
                    />
                </Container>
                <Separator height={100} />
                <BannerAd
                    title="Registrate y obten los mejores precios"
                    subtitle="¡Compara con otros juegos y elige el tuyo!"
                    btnTitle="Entrar ahora"
                    btnLink="/account"
                    image="/images/img01.png"
                />{" "}
                <Separator height={50} />

                <Container>
                    <LatestGames
                        title="Xbox"
                        limit={3}
                        platformId={platformsId.xbox}
                    />
                </Container>


                <Separator height={50} />

            </BasicLayout>
        </>
    );
}
