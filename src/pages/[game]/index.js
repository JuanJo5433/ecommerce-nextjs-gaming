import { Game } from "@/api/game";

export { default } from "./game";

export async function getServerSideProps(context) {
  const {
    params: { game },
  } = context;

  const gameCtrl = new Game();
  const response = await gameCtrl.getBySlug(game);
  console.log("Game response:", response); // Verifica la respuesta aquí.
  

  return {
    props: {
      game: response,
    },
  };
}
