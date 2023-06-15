import { GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import marvelService from "@/services/marvelAPI";
import type { ComicFull, Character } from "@/interfaces/types";

interface CharacterComicsProps {
  characterData: Character;
  comicsData: Array<ComicFull>;
}
export default function CharacterComicsPage({
  comicsData,
  characterData,
}: CharacterComicsProps) {
  return (
    <Layout>
      <main className={`flex min-h-screen flex-row p-24`}> Soon....</main>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const characterId = context?.params?.id;

  const res = await marvelService.get(`/characters/${characterId}/comics`, `?`);
  const data = await res;

  const resCharacter = await marvelService.get(
    "/characters",
    `?id=${characterId}&`
  );
  const dataCharacter = await resCharacter;

  return {
    props: {
      comicsData: data.data.results[0],
      characterData: dataCharacter.data.results[0],
    },
  };
};
