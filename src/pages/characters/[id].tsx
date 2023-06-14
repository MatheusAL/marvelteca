import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import marvelService from "@/services/marvelAPI";
import NumberView from "@/components/NumberView";
import Link from "next/link";
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
  collectionURI: string;
  items: Array<Comic>;
}
interface Serie {
  resourceURI: string;
  name: string;
}
interface Series {
  available: number;
  collectionURI: string;
  items: Array<Serie>;
}

interface Story {
  resourceURI: string;
  name: string;
}
interface Stories {
  available: number;
  collectionURI: string;
  items: Array<Story>;
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
interface CharacterProps {
  characterData: Character;
}
export default function CharacterPage({ characterData }: CharacterProps) {
  const thumbnailPath: string =
    characterData.thumbnail.path + "." + characterData.thumbnail.extension;
  const router = useRouter();
  const characterId = router.query.id;
  return (
    <Layout>
      <main className="flex min-h-screen lg:flex-row flex-col lg:p-24 p-8">
        <div className="self-center py-3">
          <Image
            className="object-fit border border-white rounded-lg drop-shadow-2xl"
            src={thumbnailPath}
            alt={characterData.name}
            loading="lazy"
            width="300"
            height="300"
          />
        </div>
        <section className="flex flex-col px-8 py-3 text-white bg-black rounded-lg mx-8 drop-shadow-2xl max-h-min">
          <p className="text-bold md:text-[36px] text-[24px] py-3">
            Informações do herói:{" "}
          </p>
          <p className="text-bold md:text-[28px] text-[15px]">Nome:</p>
          <span className="pb-3 hover:text-red-700">{characterData.name}</span>
          {characterData.description !== "" && (
            <>
              <p className="text-bold  md:text-[28px] text-[15px]">
                Descrição:
              </p>
              <span className="pb-3 hover:text-red-700">
                {characterData.description}
              </span>
            </>
          )}
          <div className="info pt-8">
            <p className="text-bold md:text-[28px] text-[15px]">Aparece em:</p>
            <div className="numbers flex justify-around">
              {characterData.comics && (
                <NumberView
                  number={characterData.comics.available}
                  label={"HQs"}
                />
              )}
              {characterData.series && (
                <NumberView
                  number={characterData.series.available}
                  label={"Séries"}
                />
              )}
              {characterData.stories && (
                <Link href={`/characters/comics/${characterId}/`}>
                  <NumberView
                    number={characterData.stories.available}
                    label={"Histórias"}
                  />
                </Link>
              )}
            </div>
          </div>
          <section className="flex justify-around max-h-72 overflow-scroll pt-4 border border-white rounded-xl py-3">
            <div className="comics">
              {characterData.comics?.items.map((comic) => (
                <p className="hover:text-red-700" key={comic.name}>
                  {comic.name}
                </p>
              ))}
            </div>
            <div className="series">
              {characterData.series?.items.map((comic) => (
                <p className="hover:text-red-700" key={comic.name}>
                  {comic.name}
                </p>
              ))}
            </div>
            <div className="histories">
              {characterData.stories?.items.map((comic) => (
                <p className="hover:text-red-700" key={comic.name}>
                  {comic.name}
                </p>
              ))}
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const characterId = context?.params?.id;
  const res = await marvelService.get("/characters", `?id=${characterId}&`);
  const data = await res;
  return {
    props: {
      characterData: data.data.results[0],
    },
  };
};
