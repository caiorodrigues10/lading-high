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

interface ILoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const loginSchema = y.object().shape({
  email: y.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: y.string().required("Senha é obrigatória"),
});

type ILoginSchema = y.InferType<typeof loginSchema>;

export function Login({ isOpen, onClose }: ILoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submit = useCallback(
    async (data: ILogin) => {
      setIsLoading(true);

      const response = await login(data);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        addCookie({
          expirationDays: 1,
          name: "high.token",
          value: response.data.token,
        });
        addCookie({
          expirationDays: 1,
          name: "high.name",
          value: response.data.user.name,
        });
        addCookie({
          expirationDays: 1,
          name: "high.accessLevel",
          value: response.data.user.tagPermission,
        });
        addCookie({
          expirationDays: 1,
          name: "high.email",
          value: response.data.user.email,
        });
        addCookie({
          expirationDays: 30,
          name: "high.refreshToken",
          value: response.data.refreshToken,
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
    [toast]
  );

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="xl">
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
                  id="inputTest"
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
              <a className="hover:text-sky-500 hover:underline duration-200 cursor-pointer">
                Cadastrar-se
              </a>
            </p>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
