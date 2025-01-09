import { Game } from "@/api/game";
import { Platform } from "@/api/plataform";

export { default } from "./platform";
const platformCtrl = new Platform();


export async function getServerSideProps(context) {
  const {
    params: { platform },
    query: { page = 1 },
  } = context;

  const responsePlatform = await platformCtrl.getBySlug(platform);

  const gameCtrl = new Game();
  const responseGames = await gameCtrl.getGamesByPlatformSlug(platform, page);

  return {
    props: {
      platform: responsePlatform,
      games: responseGames.data,
      pagination: responseGames.meta.pagination,
    },
  };
}