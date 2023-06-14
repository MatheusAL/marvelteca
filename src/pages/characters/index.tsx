import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import Image from "next/image";
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
  totalCharactersReceived: number;
}
export default function Characters({
  charactersData,
  totalCharactersReceived,
}: CharactersProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayLimit, setDisplayLimit] = useState<number>(50);
  const [totalCharacters, setTotalCharacters] = useState<number>(
    totalCharactersReceived
  );
  const [charactersDataList, setCharacterData] =
    useState<Array<Character>>(charactersData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shieldPath = "/shield.svg";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * 50;
      const res = await marvelService.get(
        "/characters",
        `?orderBy=name&offset=${offset}&limit=50&`
      );
      const data = await res;
      console.log(data);
      setCharacterData(data.data.results);
      const limit =
        data.data.limit >= data.data.total ? data.data.total : data.data.limit;
      setDisplayLimit(limit);
      setTotalCharacters(data.data.total);
      setLoading(false);
    };
    if (currentPage !== 1) {
      fetchData();
    }
  }, [currentPage]);

  useEffect(() => {
    const searchCharacters = async () => {
      setLoading(true);
      const res = await marvelService.get(
        "/characters",
        `?nameStartsWith=${searchQuery}&orderBy=name&limit=50&`
      );
      const data = await res;
      console.log(data);
      setCharacterData(data.data.results);
      setTotalCharacters(data.data.total);
      setLoading(false);
    };
    if (searchQuery.length >= 3) {
      searchCharacters();
    }
  }, [searchQuery]);

  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1 className="text-[42px] text-white font-bold">Marvel Characters</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {loading ? (
          <Image
            alt="loading"
            width="200"
            height="200"
            src={shieldPath}
            className="animate-spin animate-pulse"
          />
        ) : (
          <div className="grid lg:grid-cols-6 gap-6 pt-3 sm:grid-cols-4 pb-10 min-h-max">
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
          totalCharacters={totalCharacters}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          displayLimit={displayLimit}
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
      totalCharactersReceived: data.data.total,
    },
  };
};
