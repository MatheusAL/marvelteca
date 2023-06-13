export default function SearchBar() {
  return (
    <div className="flex rounded w-full py-3">
      <input
        type="text"
        className="block w-4/5 px-4 py-2 text-red-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Search..."
      />
      <button className="px-4 w-1/5 text-white bg-black border-l ml-3 rounded ">
        Search
      </button>
    </div>
  );
}
