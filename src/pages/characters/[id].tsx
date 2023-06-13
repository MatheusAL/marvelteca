import { useRouter } from "next/router";
import Image from "next/image";
interface Thumbnail {
  path: string;
  extension: string;
}
interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics?: object;
  series?: object;
  stories?: object;
  events?: object;
}
interface CharacterProps {
  characterData: Character;
}
export default function CharacterPage({ characterData }: CharacterProps) {
  let router = useRouter();
  let characterId: string | string[] | undefined = router.query.id;
  const thumbnailPath: string =
    characterData.thumbnail.path + "." + characterData.thumbnail.extension;
  return (
    <main className={`flex min-h-screen flex-row p-24`}>
      <Image
        className="object-fit border border-white rounded-lg drop-shadow-2xl"
        src={thumbnailPath}
        alt={characterData.name}
        loading="lazy"
        width="300"
        height="300"
      />
      <section className="flex flex-col px-8 text-white bg-black rounded-lg mx-8 drop-shadow-2xl w-full">
        <p className="text-bold text-[36px] py-8">Informações do herói</p>
        <p className="text-bold text-[28px]">Nome:</p>
        <span className="pb-3">{characterData.name}</span>
        <p className="text-bold  text-[28px]">Descrição:</p>
        <span className="pb-3">{characterData.description}</span>
        <div className="info pt-8">
          <p className="text-bold text-[28px]">Aparece em:</p>
          <div className="numbers flex justify-around">
            <div className="flex flex-col hover:text-red-700">
              <b className="flex justify-center">
                {characterData.comics.available}
              </b>
              <b>HQs</b>
            </div>
            <div className="flex flex-col hover:text-red-700">
              <b className="flex justify-center">
                {characterData.series.available}
              </b>
              <b>Séries</b>
            </div>
            <div className="flex flex-col hover:text-red-700">
              <b className="flex justify-center">
                {characterData.stories.available}
              </b>
              <b>Histórias</b>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps = async ({ query }) => {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  let characterId = query.id;
  var md5 = require("md5");
  const api = `http://gateway.marvel.com/v1/public/characters?id=${characterId}&ts=`;
  const timestamp = new Date().toISOString();
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  const apiUrl = api + timestamp + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log(data.data.results[0]);
  return {
    props: {
      characterData: data.data.results[0],
    },
  };
};
