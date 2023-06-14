import Link from "next/link";
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
export default function CharacterCard({ characterData }: CharacterProps) {
  const thumbnailPath: string =
    characterData.thumbnail.path + "." + characterData.thumbnail.extension;
  return (
    <Link href={`/characters/${characterData.id}`}>
      <section
        key={characterData.id}
        className="flex flex-col rounded-lg h-full w-100 hover:scale-110 transition duration-150 ease-out"
      >
        <div className="h-56 overflow-hidden">
          <Image
            className="object-fit w-full border border-white rounded-lg"
            src={thumbnailPath}
            alt={characterData.name}
            loading="lazy"
            width="200"
            height="200"
          />
        </div>
        <b className="text-white">{characterData.name}</b>
      </section>
    </Link>
  );
}
