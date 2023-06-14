interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (search: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div className="flex rounded w-full py-3">
      <label
        for="limit"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Mostrar
      </label>
      <select
        id="limit"
        className="block w-1/6 px-4 py-2 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      >
        <option selected></option>
        <option value="50">50</option>
        <option value="25">25</option>
        <option value="10">10</option>
      </select>
      <label
        for="limit"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Mostrar
      </label>
      <select
        id="limit"
        className="block w-1/6 px-4 py-2 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      >
        <option selected></option>
        <option value="50">50</option>
        <option value="25">25</option>
        <option value="10">10</option>
      </select>
      <input
        type="text"
        className="block w-3/6 px-4 py-2 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Pesquisar Personagens"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        onClick={() => setSearchQuery("")}
        className="px-4 w-1/6 text-white bg-black border-l ml-3 rounded hover:text-black hover:bg-white"
      >
        Clear
      </button>
    </div>
  );
}
