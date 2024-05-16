import { BodyPage } from "@/components/BodyPage";
import { Card } from "@/components/Card";
import { EspecialButton } from "@/components/EspecialButton";
import { Heading } from "@/components/Heading";
import { TitlePageScale } from "@/components/page/home/TitlePageScale";
import TiltComponent from "@/components/Tilt";
import { AvatarIcon } from "@nextui-org/react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import {
  FaDiscord,
  FaInstagram,
  FaPlay,
  FaRegStar,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

export default function HomePage() {
  return (
    <BodyPage className="flex flex-col">
      <div className="bg-[url('/images/bg-2.svg')] h-screen bg-no-repeat bg-cover w-full justify-center flex max-2xl:px-20 max-sm:px-6">
        <div className="flex w-full justify-between items-center max-w-7xl">
          <div className="flex flex-col gap-14 w-full max-sm:items-center">
            <div className="flex flex-col gap-4 max-sm:items-center">
              <TitlePageScale />
              <p className="font-medium text-xl mt-4 max-sm:text-center">
                Aqui você é acolhido como um discípulo e sai como um professor!
              </p>
              <p className="font-medium text-lg italic max-sm:text-center">
                Tudo para elevar o seu nível de game play!
              </p>
            </div>
            <EspecialButton
              className="w-fit !py-4 !bg-transparent"
              variant="success"
              rightIcon={<FaPlay size={16} />}
            >
              Serviços
            </EspecialButton>
          </div>
          <Image
            alt=""
            src={"/images/jhinx.svg"}
            width={550.68}
            height={1000}
            className="max-lg:w-[350px] max-sm:hidden"
          />
        </div>
      </div>
      <div className="bg-[url('/images/bg-1.svg')] h-full bg-no-repeat bg-cover w-full justify-center flex max-2xl:px-20 max-sm:px-6">
        <div className="flex w-full flex-col items-center max-w-7xl -mt-40 max-sm:mt-0  pb-40 gap-4">
          <div
            className="flex justify-between w-full items-center max-sm:justify-center"
            id="services"
          >
            <Image
              alt=""
              src={"/images/yasuo.svg"}
              width={400}
              height={1000}
              className="max-lg:w-[350px] max-sm:hidden"
            />
            <h1 className="uppercase text-5xl font-bold text-spring-green-500 text-right max-lg:text-3xl max-sm:mb-6 max-sm:text-center">
              Nossos serviços
            </h1>
          </div>
          <div className="flex justify-between w-full gap-12 max-lg:flex-col max-lg:items-center">
            <TiltComponent className="w-1/3 max-lg:w-full max-lg:max-w-[400px]">
              <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative  h-full">
                <div className="flex flex-col gap-6 items-center">
                  <div className="group-hover:opacity-100 opacity-0 -mt-12 -mb-4 text-spring-green-500 font-bold text-shadow-green">
                    Selecionar serviço
                  </div>
                  <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center group-hover:rotate-90 group-hover:text-black group-hover:bg-spring-green-500 duration-500">
                    <ArrowUp size={24} />
                  </div>
                  <Heading size="sm" className="!text-spring-green-500">
                    Jogaremos na sua conta
                  </Heading>
                </div>
                <Heading size="lg" className="!text-3xl">
                  ELO JOB
                </Heading>
                <p className="text-[#B3B3B3]">
                  Ideal para você que travou em alguma divisão, jogaremos em sua
                  conta até atingir o ELO desejado
                </p>
              </Card>
            </TiltComponent>
            <TiltComponent className="w-1/3 max-lg:w-full max-lg:max-w-[400px]">
              <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative  h-full">
                <div className="flex flex-col gap-6 items-center">
                  <div className="group-hover:opacity-100 opacity-0 -mt-12 -mb-4 text-spring-green-500 font-bold text-shadow-green">
                    Selecionar serviço
                  </div>
                  <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center group-hover:rotate-90 group-hover:text-black group-hover:bg-spring-green-500 duration-500">
                    <ArrowUp size={24} />
                  </div>
                  <Heading size="sm" className="!text-spring-green-500">
                    Iremos jogar junto com você
                  </Heading>
                </div>
                <Heading size="lg" className="!text-3xl">
                  DUO BOOST
                </Heading>
                <p className="text-[#B3B3B3]">
                  Você sobe de ELO enquanto joga DUO com Desafiantes e recebe
                  dicas incríveis durante a partida!
                </p>
              </Card>
            </TiltComponent>
            <TiltComponent className="w-1/3 max-lg:w-full max-lg:max-w-[400px]">
              <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative h-full">
                <div className="flex flex-col gap-6 items-center">
                  <div className="group-hover:opacity-100 opacity-0 -mt-12 -mb-4 text-spring-green-500 font-bold text-shadow-green">
                    Selecionar serviço
                  </div>
                  <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center group-hover:rotate-90 group-hover:text-black group-hover:bg-spring-green-500 duration-500">
                    <ArrowUp size={24} />
                  </div>
                  <Heading size="sm" className="!text-spring-green-500">
                    Os princípios do LOL
                  </Heading>
                </div>
                <Heading size="lg" className="!text-3xl">
                  COACH
                </Heading>
                <p className="text-[#B3B3B3]">
                  Consegui aprender o básico, mais ainda não consigo aplicar por
                  conta própria!
                </p>
              </Card>
            </TiltComponent>
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/bg-6.svg')] h-full bg-no-repeat bg-cover w-full justify-center flex max-2xl:px-20 max-sm:px-6">
        <div className="flex w-full flex-col items-center -mt-20 max-w-7xl pb-20 gap-6">
          <div
            className="flex justify-between w-full items-center max-sm:justify-center"
            id="assessments"
          >
            <h1 className="uppercase text-5xl font-bold text-spring-green-500 max-lg:text-3xl max-sm:mt-20">
              AVALIAÇÕES
            </h1>
            <Image
              alt=""
              src={"/images/tresh.svg"}
              width={400}
              height={1000}
              className="max-lg:w-[300px] max-sm:hidden"
            />
          </div>
          <div className="flex justify-between w-full gap-12 max-lg:flex-col max-lg:items-center">
            <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative w-1/3 !cursor-default max-lg:w-full max-lg:max-w-[400px]">
              <div className="-mt-12 -mb-4 text-spring-green-500 font-bold">
                ELO JOB
              </div>
              <div className="flex flex-col gap-6 items-center">
                <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center">
                  <AvatarIcon />
                </div>
                <div className="text-spring-green-500 flex gap-2 text-3xl">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
              </div>
              <Heading size="lg" className="!text-3xl">
                xxDarKill
              </Heading>
              <p className="text-[#B3B3B3]">
                Achei bem completo o trabalho, jogaram com os campeões que pedi
                e entregaram antes do prazo desejado
              </p>
            </Card>
            <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative w-1/3 !cursor-default max-lg:w-full max-lg:max-w-[400px]">
              <div className="-mt-12 -mb-4 text-spring-green-500 font-bold">
                DUO BOOST
              </div>
              <div className="flex flex-col gap-6 items-center">
                <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center">
                  <AvatarIcon />
                </div>
                <div className="text-spring-green-500 flex gap-2 text-3xl">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
              </div>
              <Heading size="lg" className="!text-3xl">
                Yasuo Boladinho
              </Heading>
              <p className="text-[#B3B3B3]">
                Muito top, pena que o ajudante roubava todas as minhas kills,
                seria legal eu conseguir jogar também!
              </p>
            </Card>
            <Card className="group flex flex-col gap-6 items-center justify-center !py-16 !px-6 text-center relative w-1/3 !cursor-default max-lg:w-full max-lg:max-w-[400px]">
              <div className="-mt-12 -mb-4 text-spring-green-500 font-bold">
                COACH
              </div>
              <div className="flex flex-col gap-6 items-center">
                <div className="rounded-full p-4 text-spring-green-500 w-14 h-14 border-spring-green-500 border-2 flex justify-center items-center">
                  <AvatarIcon />
                </div>
                <div className="text-spring-green-500 flex gap-2 text-3xl">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
              </div>
              <Heading size="lg" className="!text-3xl">
                JuJu
              </Heading>
              <p className="text-[#B3B3B3]">
                Consegui aprender o básico, mas ainda não consigo aplicar por
                conta própria!
              </p>
            </Card>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-t from-[#068b5137] to-[#00000070] w-full h-full flex flex-col items-center">
        <Image
          src={"/images/divider.svg"}
          alt=""
          width={999}
          height={20}
          className="w-full -mt-2"
        />
        <div className="flex justify-between w-full py-20 max-w-7xl max-2xl:px-20 max-md:flex-col gap-14 max-md:justify-center max-sm:px-6">
          <div className="flex flex-col w-1/3 gap-6 max-md:w-full max-md:items-center">
            <p className="uppercase text-5xl font-bold text-left w-fit text-spring-green-500 max-md:text-center max-sm:text-3xl">
              HIGH <br /> BOOSTER
            </p>
            <p className="font-semibold text-lg max-md:text-center max-sm:text-md">
              Não apenas upamos elos, criamos experiências que elevam o jogo
              para novas alturas. Junte-se a nós e embarque na jornada para a
              grandeza no League of Legends!
            </p>
          </div>
          <div className="flex flex-col gap-8 max-md:items-center">
            <Heading className="!text-spring-green-500 font-semibold">
              Links úteis
            </Heading>
            <ul className="flex flex-col gap-2 max-md:items-center">
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit">
                Serviços
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit">
                Avaliações
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit">
                Elo job
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit">
                Duo Boost
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit">
                Coach
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-8 max-md:items-center">
            <Heading className="!text-spring-green-500 font-semibold">
              Contatos
            </Heading>
            <ul className="flex flex-col gap-4 max-md:items-center">
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit flex gap-3 items-center">
                <FaDiscord size={22} />
                Discord
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit flex gap-3 items-center">
                <FaInstagram size={22} />
                Instagram
              </li>
              <li className="hover:text-zinc-300 cursor-pointer duration-200 w-fit flex gap-3 items-center">
                <FaWhatsapp size={22} />
                WhatsApp
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </BodyPage>
  );
}
