"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { TimerProvider } from "@/context/TimerContext";
import { login } from "@/services/auth/client";
import { ILogin } from "@/services/auth/types";
import { addCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail } from "react-icons/io";
import { RecoveryPassword } from "./RecoveryPassword";
import * as y from "yup";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

interface ILoginProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSingUp: () => void;
  setShowActiveAccount: (val: boolean) => void;
}

const loginSchema = y.object().shape({
  email: y.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: y.string().required("Senha é obrigatória"),
});

type ILoginSchema = y.InferType<typeof loginSchema>;

export function Login({
  isOpen,
  onClose,
  onOpenSingUp,
  setShowActiveAccount,
}: ILoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [stayLogged, setStayLogged] = useState(true);
  const { refresh } = useRouter();
  const { setEmailLogin } = useAppContext();
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submit = useCallback(
    async (data: ILogin) => {
      setIsLoading(true);
      const days = stayLogged ? 30 : 1;

      const response = await login(data);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        addCookie({
          expirationDays: days,
          name: "landing.token",
          value: response.data.token,
        });
        addCookie({
          expirationDays: days,
          name: "landing.name",
          value: response.data.user.name,
        });
        addCookie({
          expirationDays: days,
          name: "landing.accessLevel",
          value: response.data.user.tagPermission,
        });
        addCookie({
          expirationDays: days,
          name: "landing.email",
          value: response.data.user.email,
        });
        addCookie({
          expirationDays: days,
          name: "landing.refreshToken",
          value: response.data.refreshToken,
        });
        addCookie({
          expirationDays: days,
          name: "landing.id",
          value: response.data.user.id,
        });
        refresh();
        onClose();
      } else {
        if (response?.result === "info") {
          setShowActiveAccount(true);
          onOpenSingUp();
          setEmailLogin(data.email);
        }
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [
      toast,
      stayLogged,
      refresh,
      onClose,
      setShowActiveAccount,
      onOpenSingUp,
      setEmailLogin,
    ]
  );

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center text-3xl">
          Login
        </ModalHeader>
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody className="flex flex-col gap-6">
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
                  placeholder="Digite seu email"
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  startContent={
                    <IoMdMail className="text-white/60" size={18} />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Senha"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Digite sua senha"
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  startContent={
                    <IoMdLock className="text-white/60" size={18} />
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <div className="flex w-full justify-between">
              <Checkbox
                defaultSelected
                value={"true"}
                onChange={(e) => setStayLogged(!!e.target.value)}
                color="success"
                size="sm"
                classNames={{
                  label: "text-zinc-300",
                }}
              >
                Permanecer logado
              </Checkbox>
              <TimerProvider>
                <RecoveryPassword />
              </TimerProvider>
            </div>
          </ModalBody>
          <ModalFooter className="gap-4 flex flex-col mt-2">
            <EspecialButton
              className="w-full"
              variant="success"
              type="submit"
              isLoading={isLoading}
            >
              Entrar
            </EspecialButton>
            <p className="text-center w-full py-3 text-sm text-zinc-300">
              Não possuí conta ainda?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenSingUp();
                  onClose();
                  reset();
                }}
                className="hover:text-sky-500 hover:underline duration-200 cursor-pointer"
              >
                Cadastrar-se
              </button>
            </p>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
