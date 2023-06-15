import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-center p-24 text-white text-weight-bold`}
      >
        <h1 className="text-[52px] py-8">MARVELTECA</h1>
        <span className="italic py-10">
          &quot;Eu não acho que nenhum escritor pode criar qualquer tipo de
          história se ele ou ela não se sentir realmente no personagem no
          momento em que escreve. Stan Lee&quot;
        </span>
        <button
          onClick={() => router.push("/characters")}
          className="border border-white bg-black mx-auto text-lg rounded shadow py-2 px-4 hover:bg-white hover:text-black"
        >
          Entre nessa aventura!
        </button>
      </main>
    </Layout>
  );
}
