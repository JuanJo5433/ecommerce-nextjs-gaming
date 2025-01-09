import { HeaderWallpaper } from "@/components/Game/HeaderWallpaper/HeaderWallpaper";
import { Info } from "@/components/Game/Info/Info";
import { Media } from "@/components/Game/Media/Media";
import { Panel } from "@/components/Game/Panel/Panel";
import { Seo } from "@/components/Shared/Seo/Seo";
import { Separator } from "@/components/Shared/Separator/Separator";
import { BasicLayout } from "@/layouts/BasicLayout";
import { ENV } from "@/utils/constants";

export default function GamePage(props) {
  const { game } = props;
  const wallpaper = game.wallpaper;
console.log(game)
  return (
    <>
      <Seo
        title={game.title}
        description={game.summary}
      />

      <BasicLayout>
        <HeaderWallpaper image={ENV.SERVER_HOST+wallpaper.url} />
        <Panel gameId={game.documentId} game={game} />

        <Separator height={50} />

          <Info game={game} />

        <Separator height={30} />

        <Media
          video={game.video}
          screenshots={game.screenshots}
        />

        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
