import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import SearchBar from "@/components/SearchBar";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import marvelService from "@/services/marvelAPI";

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
interface CharactersProps {
  charactersData: Array<Character>;
  requestData: any;
}
export default function Characters({
  charactersData,
  requestData,
}: CharactersProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [charactersDataList, setCharacterData] =
    useState<Array<Character>>(charactersData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * 50;
      const res = await marvelService.get(
        "/characters",
        `?orderBy=name&offset=${offset}&limit=50&`
      );
      const data = await res;
      setCharacterData(data.data.results);
      setLoading(false);
    };
    //if (!loading) {
    fetchData();
    //}
  }, [currentPage]);

  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1 className="text-[42px] text-white font-bold">Marvel Characters</h1>
        <SearchBar />
        {loading ? (
          <h1>loading</h1>
        ) : (
          <div className="grid lg:grid-cols-6 gap-6 pt-3 sm:grid-cols-4">
            {!loading && (
              <>
                {charactersDataList.map((result) => (
                  <CharacterCard key={result.id} characterData={result} />
                ))}
              </>
            )}
          </div>
        )}
        <Pagination
          totalCharacters={requestData.total}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </Layout>
  );
}
export const getServerSideProps = async () => {
  const res = await marvelService.get(
    "/characters",
    "?orderBy=name&offset=0&limit=50&"
  );
  const data = await res;
  return {
    props: {
      charactersData: data.data.results,
      requestData: data.data,
    },
  };
};
