import ApplicationLayout from "@/components/Layout/ApplicationLayout/ApplicationLayout";
import ApplicationConfig from "@/components/Layout/ApplicationConfig";
import fetcher from "./api/fetcher";
import useSWR from "swr";
import { Characters } from "@/types/character.types";
import Mappers from "@/util/mapper.util";
import CharacterList from "@/components/List/CharacterList";
import { GetServerSidePropsContext } from "next";

export default function Home(
  data: Characters.GetCharacterResponse
) {
  //  const { data2, error, isLoading } = useSWR("api/character", fetcher, {init});
 
  //   if (error) {
  //     return <div>Error loading data</div>;
  //   }
  //   if (isLoading) {
  //     return <div>loading data</div>;
  //   }

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

  const fetchedData: Characters.GetCharacterResponse = await fetcher(
    `/api/character?page=${page}&limit=${limit}`
  );

  return {
    props: {
      ...fetchedData,
      characters: fetchedData.characters.map(Mappers.mapToCharacterObject),
    },
  };
}
