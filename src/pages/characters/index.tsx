import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import CharacterCard from "@/components/CharacterCard";

interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: object;
  resourceURI: string;
  comics?: object;
  series?: object;
  stories?: object;
  events?: object;
}
interface CharactersProps {
  charactersData: Array<Character>;
}
export default function Characters({ charactersData }: CharactersProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-red-500 to-red-900`}
    >
      <h1 className="text-[28px]">Marvel characters</h1>
      <div className="grid grid-cols-4">
        {charactersData && (
          <>
            {charactersData.map((result) => (
              <CharacterCard key={result.id} characterData={result} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
export const getServerSideProps = async () => {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  var md5 = require("md5");
  const api =
    "http://gateway.marvel.com/v1/public/characters?orderBy=name&limit=50&ts=";
  const timestamp = new Date().toISOString();
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  const apiUrl = api + timestamp + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

  const res = await fetch(apiUrl);
  const data = await res.json();
  return {
    props: {
      charactersData: data.data.results,
    },
  };
};
