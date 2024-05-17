"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/services/users/client";
import { IEditUser, IUser } from "@/services/users/types";
import { addCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { CircleChevronLeft, Mail, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as y from "yup";
import { ConfirmSingOut } from "../home/ConfirmSignOut";
import { ChangePassword } from "./ChangePassword";

const userSchema = y.object().shape({
  name: y.string().required("Nome é obrigatório"),
});

type IUserSchema = y.InferType<typeof userSchema>;

interface IUserPageProps {
  data: IUser;
}

export function UserPage({ data }: IUserPageProps) {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    onClose: onCloseChangePassword,
    isOpen: isOpenChangePassword,
    onOpen: onOpenChangePassword,
  } = useDisclosure();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { refresh, back } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserSchema>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: data.name,
    },
  });

  const submit = useCallback(
    async (dataForm: IEditUser) => {
      setIsLoading(true);

      const response = await editUser(dataForm, data.id);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        addCookie({
          expirationDays: 30,
          name: "landing.name",
          value: response.data.name,
        });
        refresh();
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [data, refresh, toast]
  );

  const buttonOptions = useMemo(
    () => [
      {
        name: "Meus dados",
        action: () => setStep(0),
      },
      {
        name: "Meus pedidos",
        action: () => setStep(1),
      },
      {
        name: "Sair",
        action: onOpen,
      },
    ],
    [onOpen]
  );

  const simulateData = useMemo(
    () => [
      {
        name: "Elo job",
        player: "Cardoso",
        value: "R$ 199,99",
        createdAt: "10/04/2024",
        endedAt: "11/04/2024",
        status: "concluded",
        initialElo: "Gold",
        initialTier: "4",
        finalELo: "Esmeralda",
        finalTier: "2",
      },
      {
        name: "Elo job",
        player: "Cardoso",
        value: "R$ 199,99",
        createdAt: "10/04/2024",
        endedAt: "14/04/2024",
        status: "in progress",
        initialElo: "Gold",
        initialTier: "4",
        finalELo: "Esmeralda",
        finalTier: "2",
      },
      {
        name: "Elo job",
        player: "Cardoso",
        value: "R$ 199,99",
        createdAt: "10/04/2024",
        endedAt: "11/04/2024",
        status: "concluded",
        initialElo: "Gold",
        initialTier: "4",
        finalELo: "Esmeralda",
        finalTier: "2",
      },
      {
        name: "Elo job",
        player: "Cardoso",
        value: "R$ 199,99",
        createdAt: "10/04/2024",
        endedAt: "22/04/2024",
        status: "in progress",
        initialElo: "Gold",
        initialTier: "4",
        finalELo: "Esmeralda",
        finalTier: "2",
      },
      {
        name: "Elo job",
        player: "Cardoso",
        value: "R$ 199,99",
        createdAt: "10/04/2024",
        endedAt: "14/04/2024",
        status: "in progress",
        initialElo: "Gold",
        initialTier: "4",
        finalELo: "Esmeralda",
        finalTier: "2",
      },
    ],
    []
  );

  return (
    <div className="bg-[url('/images/bg-7.svg')] h-screen bg-no-repeat bg-cover w-full justify-center flex max-2xl:px-20 max-sm:px-6">
      <div className="flex w-full gap-4 max-w-7xl pt-36 pb-10">
        <Card className="h-fit w-1/4">
          <CardHeader className="justify-center w-full flex font-semibold">
            Menu
          </CardHeader>
          <CardBody className="flex flex-col gap-4 p-4 pt-0">
            {buttonOptions.map((e, i) => (
              <Button
                key={i}
                variant="flat"
                className={clsx("w-full", {
                  "bg-zinc-700": step === i,
                  "bg-red-500 text-black": e.name === "Sair",
                })}
                onClick={e.action}
              >
                {e.name}
              </Button>
            ))}
          </CardBody>
        </Card>

        <Card className="h-full w-full p-4">
          <CardHeader className="flex gap-4 items-center">
            <CircleChevronLeft
              size={28}
              onClick={back}
              className="hover:scale-110 duration-200 cursor-pointer"
            />

            <Heading>
              {step === 0 && "Meus dados"}
              {step === 1 && "Meus pedidos"}
            </Heading>
          </CardHeader>
          {step === 0 && (
            <form onSubmit={handleSubmit(submit)}>
              <CardBody className="gap-4">
                <div className="flex justify-between py-4 pt-2">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm text-zinc-300">E-mail:</p>
                    <Heading size="sm">{data.email}</Heading>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm text-zinc-300">
                      Ativo desde:
                    </p>
                    <Heading size="sm">
                      {new Date(data.createdAt)?.toLocaleDateString()}
                    </Heading>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm text-zinc-300">
                      Tipo de usuário:
                    </p>
                    <Heading size="sm">
                      {data.userpermissions.description}
                    </Heading>
                  </div>
                </div>
                <Divider />

                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label="Nome"
                      labelPlacement="outside"
                      autoComplete="newPassword"
                      size="lg"
                      placeholder="Digite seu nome"
                      isInvalid={!!errors.name?.message}
                      errorMessage={errors.name?.message}
                      startContent={
                        <User2 className="text-white/60" size={18} />
                      }
                    />
                  )}
                />
              </CardBody>

              <CardFooter className="flex justify-end w-full gap-4">
                <EspecialButton
                  type="button"
                  disabled={isLoading}
                  onClick={onOpenChangePassword}
                >
                  Editar senha
                </EspecialButton>
                <EspecialButton
                  type="submit"
                  variant="success"
                  isLoading={isLoading}
                >
                  Salvar
                </EspecialButton>
              </CardFooter>
            </form>
          )}
          {step === 1 && (
            <div className="flex flex-wrap gap-4 overflow-y-auto scrollbar-hide p-4">
              {simulateData.map((e, i) => (
                <Card className="w-full bg-zinc-800" key={i}>
                  <CardHeader className="flex gap-4 justify-between">
                    <div className="flex gap-3">
                      <Image
                        alt="nextui logo"
                        height={40}
                        src="/images/yasuo.svg"
                        width={40}
                      />
                      <div className="flex flex-col">
                        <p className="text-md text-spring-green-500">
                          {e.player}
                        </p>
                        <p className="text-small text-default-500">Booster</p>
                      </div>
                    </div>
                    {e.status === "in progress" && (
                      <Button
                        className="bg-blue-700"
                        radius="full"
                        size="sm"
                        startContent={<Mail size={14} />}
                      >
                        Falar com {e.player}
                      </Button>
                    )}
                  </CardHeader>
                  <Divider />
                  <CardBody className="overflow-hidden">
                    <p className="text-small text-default-500 pb-3">
                      Dados do pedido
                    </p>
                    <div className="flex gap-4 items-center justify-between px-4 pb-3">
                      <div className="flex max-w-[200px] flex-col">
                        <p className="text-small text-default-500">Valor:</p>
                        <p className="text-md">{e.value}</p>
                      </div>
                      <Divider orientation="vertical" className="h-[70%]" />
                      <div className="flex max-w-[200px] flex-col">
                        <p className="text-small text-default-500">
                          Elo inicial:
                        </p>
                        <p className="text-md">
                          {e.initialElo} {e.initialTier}
                        </p>
                      </div>
                      <Divider orientation="vertical" className="h-[70%]" />
                      <div className="flex max-w-[200px] flex-col">
                        <p className="text-small text-default-500">
                          Elo final:
                        </p>
                        <p className="text-md">
                          {e.finalELo} {e.finalTier}
                        </p>
                      </div>
                      <Divider orientation="vertical" className="h-[70%]" />
                      <div className="flex max-w-[200px] flex-col gap-1">
                        <p className="text-small text-default-500">
                          Status do pedido:
                        </p>
                        <p className="text-md">
                          {e.status === "in progress" && (
                            <Chip color="danger" size="sm">
                              Em progresso
                            </Chip>
                          )}
                          {e.status === "concluded" && (
                            <Chip color="success" size="sm">
                              Concluído
                            </Chip>
                          )}
                        </p>
                      </div>
                      <Divider orientation="vertical" className="h-[70%]" />
                      <div className="flex max-w-[200px] flex-col">
                        <p className="text-small text-default-500">
                          Criado em:
                        </p>
                        <p className="text-md">{e.createdAt}</p>
                      </div>
                      <Divider orientation="vertical" className="h-[70%]" />
                      <div className="flex max-w-[200px] flex-col">
                        <p className="text-small text-default-500">
                          Finalizado em:
                        </p>
                        <p className="text-md">{e.endedAt}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
      <ConfirmSingOut isOpen={isOpen} onClose={onClose} />
      <ChangePassword
        isOpen={isOpenChangePassword}
        onClose={onCloseChangePassword}
        id={data.id}
      />
    </div>
  );
}
