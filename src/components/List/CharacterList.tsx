import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Grid, Pagination, Box } from "@mui/material";
import CharacterCard from "@/components/CharacterCard";
import { CharactersModule } from "@/types/character.types";

type CharacterListProps = {
  characters: Array<CharactersModule.Character>;
  currentPage: number;
  pageSize: number;
  totalCharacters: number;
};

const CharacterList = ({
  characters,
  currentPage,
  totalCharacters,
}: CharacterListProps) => {
  const itemsPerPage = 20;

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(currentPage);
  const totalPages = useRef<number>(Math.ceil(totalCharacters / itemsPerPage));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleSearch = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("limit", itemsPerPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    handleSearch(page);
  }, [page]);

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center" spacing={2}>
        {characters.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3} my={3}>
            <CharacterCard
              id={character.id}
              photoUrl={character.images[0]}
              name={character.name}
            />
          </Grid>
        ))}
      </Grid>
      <Box>
        <Pagination
          page={page}
          count={totalPages.current}
          onChange={handleChange}
        />
      </Box>
    </Grid>
  );
};

export default CharacterList;
