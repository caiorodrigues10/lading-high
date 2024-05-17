"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { useTimerContext } from "@/context/TimerContext";
import { forgotPassword } from "@/services/users/client";
import { ISendEmailForgotPassword } from "@/services/users/types";
import { isValidEmail } from "@/utils/validEmail";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import * as y from "yup";

const forgotPasswordSchema = y.object().shape({
  email: y.string().required("E-mail é obrigatório").email("E-mail inválido"),
});

type IForgotPassword = y.InferType<typeof forgotPasswordSchema>;

export function RecoveryPassword() {
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { formatTime, startCounter, isRunning } = useTimerContext();
  const [errorEmail, setErrorEmail] = useState<null | string>(null);

  const { handleSubmit, control, reset, getValues } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const submit = useCallback(
    async (data: ISendEmailForgotPassword) => {
      if (!data?.email) {
        setErrorEmail("E-mail é obrigatório");
        return;
      } else if (!isValidEmail(data.email)) {
        setErrorEmail("E-mail inválido");
        return;
      } else {
        setErrorEmail(null);
      }

      setIsLoading(true);
      const response = await forgotPassword(data);

      if (response && response.result === "success") {
        startCounter();
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [startCounter, toast]
  );

  return (
    <>
      <Link
        className="hover:text-sky-500 text-sm hover:underline cursor-pointer text-zinc-300"
        onClick={onOpen}
      >
        Esqueceu sua senha?
      </Link>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          !isRunning && reset();
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Recuperar senha
          </ModalHeader>
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody className="flex gap-4 flex-row items-end">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    size="lg"
                    className={clsx({ "w-10/12": isRunning })}
                    placeholder="Digite seu email"
                    isInvalid={!!errorEmail}
                    errorMessage={errorEmail}
                    startContent={
                      <IoMdMail className="text-white/60" size={18} />
                    }
                    disabled={isRunning}
                  />
                )}
              />

              {isRunning && (
                <h1 className="pb-3 w-2/12 flex justify-center">
                  {formatTime()}
                </h1>
              )}
            </ModalBody>
            <ModalFooter>
              <EspecialButton
                variant="danger"
                onClick={() => {
                  onClose();
                  !isRunning && reset();
                }}
                type="button"
              >
                Fechar
              </EspecialButton>

              <EspecialButton
                type="button"
                onClick={() =>
                  !isRunning && submit({ email: getValues("email") })
                }
                isLoading={isLoading}
                disabled={isRunning}
                className="w-fit"
                variant="success"
              >
                Enviar
              </EspecialButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
