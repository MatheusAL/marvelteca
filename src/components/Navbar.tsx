import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-800">
            MARVELTECA
          </span>
        </Link>
        <span className="flex self-center text-2xl font-semibold whitespace-nowrap text-red-800 hover:text-white">
          <Link href="/characters">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </Link>
        </span>
      </div>
    </nav>
  );
}
