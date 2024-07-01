import { BodyPage } from "@/components/BodyPage";
import { ClientOnly } from "@/components/ClientOnly";
import { EspecialButton } from "@/components/EspecialButton";
import { Heading } from "@/components/Heading";
import { ButtonEspecialOrder } from "@/components/page/services/ButtonEspecialOrder";
import { CardService } from "@/components/page/services/CardService";
import { Chip } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

export default function ServicesPage() {
  return (
    <BodyPage className="flex flex-col">
      <div className="bg-[url('/images/bg-5.svg')] h-screen bg-fixed bg-no-repeat bg-cover w-full justify-center flex max-2xl:px-20 max-sm:px-6">
        <div className="flex gap-4 mt-[120px] w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center">
              <EspecialButton rightIcon={<ChevronDown size={16} />}>
                Serviços
              </EspecialButton>
              <Chip
                variant="shadow"
                classNames={{
                  base: "bg-zinc-900/20 border-small border-spring-green-500 shadow-md shadow-spring-green-500/30",
                  content: "drop-shadow shadow-black text-spring-green-500",
                }}
                className=""
              >
                Elo Job
              </Chip>
            </div>
            <div className="flex gap-4 w-full">
              <ClientOnly>
                <CardService actualElo={true} defaultElo={0} />
                <CardService actualElo={false} defaultElo={7} />
              </ClientOnly>
            </div>
          </div>
          <div className="flex flex-col items-end gap-8">
            <div className="flex items-center gap-4">
              <div className="flex gap-1 text-spring-green-500">
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
              </div>
              <p className="text-nowrap font-medium text-zinc-300 text-lg">
                4000 avaliações
              </p>
            </div>
            <Heading className="!text-3xl">Ouro III até Platina II</Heading>

            <div className="flex gap-2 items-end relative">
              <Heading className="!text-5xl !text-spring-green-500">
                449,99
              </Heading>
              <Chip
                classNames={{
                  base: "bg-zinc-900 border-small border-spring-green-500",
                  content: "drop-shadow shadow-black text-spring-green-500",
                }}
                className="left-2/3 -top-1/4 absolute"
                size="sm"
              >
                -25%
              </Chip>
              <Heading className="line-through !text-zinc-400">500,00</Heading>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-2">
                <p>O pedido será iniciado em até 15 minutos</p>
                <p>Será entregue em 7 dias</p>
              </div>
              <MdOutlineTimer size={32} />
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <ButtonEspecialOrder
                  text="Definir horários"
                  percent={20}
                  className="col-span-1"
                />
                <ButtonEspecialOrder
                  text="Entrega expressa"
                  percent={20}
                  className="col-span-1"
                />
                <ButtonEspecialOrder
                  text="Mono champ"
                  percent={20}
                  className="col-span-1"
                />
                <ButtonEspecialOrder
                  text="Stream dos jogos"
                  percent={20}
                  className="col-span-1"
                />
                <ButtonEspecialOrder
                  text="Rotas e campeões"
                  percent={20}
                  className="col-span-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BodyPage>
  );
}
