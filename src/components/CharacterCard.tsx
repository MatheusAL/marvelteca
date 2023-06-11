import Link from "next/link";

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
interface CharacterProps {
  characterData: Character;
}
export default function CharacterCard({ characterData }: CharacterProps) {
  return (
    <div key={characterData.id}>
      <b>{characterData.name}</b>
      <Link href={`/characters/${characterData.id}`}>link</Link>
    </div>
  );
}
