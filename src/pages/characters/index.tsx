import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CharacterCard from "@/components/CharacterCard";
import SearchBar from "@/components/SearchBar";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import marvelService from "@/services/marvelAPI";
import type { Character } from "@/interfaces/types";
interface CharactersProps {
  charactersData: Array<Character>;
  totalCharactersReceived: number;
}
export default function Characters({
  charactersData,
  totalCharactersReceived,
}: CharactersProps) {
  /*  States   */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayLimit, setDisplayLimit] = useState<number>(50);
  const [requestLimit, setRequestLimit] = useState<number>(50);
  const [orderField, setOrderField] = useState<string>("name");
  const [totalCharacters, setTotalCharacters] = useState<number>(
    totalCharactersReceived
  );
  const [charactersDataList, setCharacterData] =
    useState<Array<Character>>(charactersData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /*  Variables   */
  const shieldPath: string = "/shield.svg";
  const firstLoad = useRef<boolean>(true);

  /* Functions */

  useEffect(() => {
    const getFilters = () => {
      let searchFilters: string = "?";
      const offset = (currentPage - 1) * 50;
      if (searchQuery.length >= 3) {
        searchFilters += `nameStartsWith=${searchQuery}&`;
      }
      searchFilters += `orderBy=${orderField}&offset=${offset}&limit=${requestLimit}&`;
      return searchFilters;
    };

    const fetchData = async () => {
      setLoading(true);

      const search = getFilters();
      const res = await marvelService.get("/characters", search);
      const data = await res;
      if (data.code === 200) {
        setCharacterData(data.data.results);
        const limit =
          data.data.limit >= data.data.total
            ? data.data.total
            : data.data.limit;
        setDisplayLimit(limit);
        setTotalCharacters(data.data.total);
      }
      setLoading(false);
    };
    if (
      (!firstLoad.current && searchQuery.length >= 3) ||
      searchQuery.length === 0
    ) {
      fetchData();
    }
    firstLoad.current = false;
  }, [currentPage, requestLimit, orderField, searchQuery]);

  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <h1 className="text-[42px] text-white font-bold">
          Personagens da Marvel
        </h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          requestLimit={requestLimit}
          setRequestLimit={setRequestLimit}
          orderField={orderField}
          setOrderField={setOrderField}
        />

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
            {charactersDataList.length === 0 ? (
              <p className="grid grid-flow-col font-bold lg:col-span-6 sm:col-span-4 text-lg">
                Nenhum personagem encotrado. Ou será que estamos em uma
                realidade paralela? &#128368;
              </p>
            ) : (
              charactersDataList.map((result) => (
                <CharacterCard key={result.id} characterData={result} />
              ))
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
