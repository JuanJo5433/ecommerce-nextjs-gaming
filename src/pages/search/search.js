import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";

import { BasicLayout } from "@/layouts/BasicLayout";
import { Pagination } from "@/components/Shared/Pagination/Pagination";
import { GridGames } from "@/components/Shared/GridGames/GridGames";
import { Separator } from "@/components/Shared/Separator/Separator";
import { NoResult } from "@/components/Shared/NoResult/NoResult";

export default function SearchPage(props) {
  const { games, pagination, searchText } = props;
  const hasResult = size(games) > 0;

  useEffect(() => {
    document.getElementById("search-games").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
