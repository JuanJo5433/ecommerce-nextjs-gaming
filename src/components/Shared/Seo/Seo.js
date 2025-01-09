import Head from "next/head";

export function Seo(props) {
  const {
    title = "Gaming - Tus juegos favoritos al mejor precio",
    description = "Tus juegos favoritos para Steam, PlayStation, Xbox, Switch al mejor precio.",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}