import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import marvelService from "@/services/marvelAPI";
import NumberView from "@/components/NumberView";

interface Thumbnail {
  path: string;
  extension: string;
}

interface Comic {
  resourceURI: string;
  name: string;
}
interface Comics {
  available: number;
  collectionURI: number;
  items: Array<Comic>;
}
interface Serie {
  resourceURI: string;
  name: string;
}
interface Series {
  available: number;
  collectionURI: number;
  items: Array<Serie>;
}

interface Storie {
  resourceURI: string;
  name: string;
}
interface Stories {
  available: number;
  collectionURI: number;
  items: Array<Storie>;
}

interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics?: Comics;
  series?: Series;
  stories?: Stories;
  events?: object;
}

interface Comic {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics?: Comics;
  series?: Series;
  stories?: Stories;
  events?: object;
}
interface CharacterProps {
  characterData: Character;
  comicsData: Array<Comic>;
}
export default function CharacterComicsPage({
  comicsData,
  characterData,
}: CharacterProps) {
  const thumbnailPath: string =
    characterData.thumbnail.path + "." + characterData.thumbnail.extension;
  return (
    <Layout>
      <main className={`flex min-h-screen flex-row p-24`}>aaaaaaaa</main>
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
