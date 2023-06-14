interface SearchBarProps {
  searchQuery: string;
  requestLimit: number;
  setSearchQuery: (search: string) => void;
  setRequestLimit: (limit: number) => void;
}

export default function SearchBar({
  searchQuery,
  requestLimit,
  setSearchQuery,
  setRequestLimit,
}: SearchBarProps) {
  return (
    <div className="flex rounded w-full py-3 drop-shadow-2xl">
      <div className="pr-2">
        <select
          id="limit"
          value={requestLimit}
          onChange={(e) => {
            setRequestLimit(parseInt(e.target.value));
          }}
          className="block px-4 py-4 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="px-4">
        <select
          id="order"
          className="block px-4 py-4 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        >
          <option selected>Ordenação</option>
          <option value="50">Nome</option>
          <option value="25">Data de Modificação</option>
          <option value="10">prei</option>
        </select>
      </div>
      <input
        type="text"
        id="search"
        className="block w-4/6 px-4 py-2 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Pesquisar personagens....."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        onClick={() => setSearchQuery("")}
        className="pl-2 w-2/6 text-white font-bold bg-black border-l ml-3 rounded hover:text-black hover:bg-white"
      >
        Limpar pesquisa!
      </button>
    </div>
  );
}
