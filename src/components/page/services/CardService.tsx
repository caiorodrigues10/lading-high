"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { Heading } from "@/components/Heading";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

interface ICardServiceProps {
  actualElo: boolean;
  defaultElo?: number;
}

interface IEloProps {
  name: string;
  tier: number[];
  urlImage: string;
}

export function CardService({ actualElo, defaultElo }: ICardServiceProps) {
  const eloArray = useMemo(
    () => [
      {
        name: "Ferro",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/iron.png",
        color: "#534644",
      },
      {
        name: "Bronze",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/bronze.png",
        color: "#5e3f3a",
      },
      {
        name: "Prata",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/silver.png",
        color: "#7f94bf",
      },
      {
        name: "Ouro",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/gold.png",
        color: "#BB7831",
      },
      {
        name: "Platina",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/plat.png",
        color: "#398374",
      },
      {
        name: "Esmeralda",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/emerald.png",
        color: "#088754",
      },
      {
        name: "Diamante",
        tier: [1, 2, 3, 4],
        urlImage: "/images/elos/diamond.png",
        color: "#416cb6",
      },
      {
        name: "Mestre",
        tier: [],
        urlImage: "/images/elos/master.png",
        color: "#cd86e7",
      },
    ],
    []
  );

  const [elo, setElo] = useState(
    defaultElo !== undefined ? eloArray[defaultElo] : eloArray[3]
  );
  const [pdlActual, setPdlActual] = useState(0);
  const [queue, setQueue] = useState<"Solo/Duo" | "Flex">("Solo/Duo");

  const handleChangeElo = useCallback(() => {}, []);

  return (
    <div
      className="flex flex-col justify-between items-center gap-4 rounded-xl shadow-xl px-4 py-10 w-full"
      style={{ background: elo.color }}
    >
      <Image alt={elo.name} src={elo.urlImage} width={160} height={160} />
      <p>{actualElo ? "Elo atual" : "Elo final"}</p>
      <Heading className="drop-shadow" size="lg">
        {elo.name} {elo.tier}
      </Heading>

      <EspecialButton
        className="w-full"
        rightIcon={
          <div className="flex gap-2 items-center">
            {pdlActual} <Pencil size={16} />
          </div>
        }
      >
        PDL
      </EspecialButton>
      <EspecialButton
        className="w-full"
        rightIcon={
          <div className="flex gap-2 items-center">
            {queue} <Pencil size={16} />
          </div>
        }
      >
        Fila
      </EspecialButton>
    </div>
  );
}
