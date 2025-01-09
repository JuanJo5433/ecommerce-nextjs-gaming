import { Container } from "semantic-ui-react";
import { size } from "lodash";

import { BasicLayout } from "@/layouts/BasicLayout";
import { GridGames } from "@/components/Shared/GridGames/GridGames";
import { Separator } from "@/components/Shared/Separator/Separator";
import { NoResult } from "@/components/Shared/NoResult/NoResult";
import { Pagination } from "@/components/Shared/Pagination/Pagination";
import { Seo } from "@/components/Shared/Seo/Seo";

export default function PlatformPage(props) {
  const { games, platform, pagination } = props;
  const hasProducts = size(games) > 0;

  return (
    <>
      <Seo title={`Juegos de ${platform.title}`} />

      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{platform.title}</h2>

          {hasProducts ? (
            <>
              <GridGames games={games} />
              <Separator  height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.title} aun no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}