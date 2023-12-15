import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import fetcher from "./api/characters";
import useSWR from "swr";
import { CharactersModule } from "@/types/character.types";
import Mappers from "@/util/mapper.util";
import CharacterList from "@/components/List/CharacterList";
import { GetServerSidePropsContext } from "next";

export default function Students(
  data: CharactersModule.GetCharacterResponse
) {

  return (
    <ApplicationLayout
      meta={<ApplicationConfig title="Home" description="Home Page" />}
    >
      <CharacterList
        characters={data.characters}
        currentPage={data.currentPage}
        pageSize={data.pageSize}
        totalCharacters={data.totalCharacters}
      />
    </ApplicationLayout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const page = query.page || 1;
  const limit = query.limit || 20;

  const fetchedData: CharactersModule.GetCharacterResponse = await fetcher(
    `/api/character?page=${page}&limit=${limit}`
  );

  return {
    props: {
      ...fetchedData,
      characters: fetchedData.characters.map(Mappers.mapToCharacterObject),
    },
  };
}
