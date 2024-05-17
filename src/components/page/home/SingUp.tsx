"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { TextInput } from "@/components/TextInput";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useTimerContext } from "@/context/TimerContext";
import { confirmCode, createUser, resendCode } from "@/services/users/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail } from "react-icons/io";
import { InferType, object, string } from "yup";

const createUserSchema = object().shape({
  email: string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: string().required("Senha é obrigatória"),
  name: string().required("Nome é obrigatório"),
  confirmPass: string().required("Confirmar senha é obrigatório"),
});

type ICreateUser = InferType<typeof createUserSchema>;

export function SingUp({
  isOpen,
  onClose,
  onOpenLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const { formatTime, startCounter, isRunning } = useTimerContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ICreateUser>({
    resolver: yupResolver(createUserSchema),
  });

  const {
    handleSubmit: handleSubmitConfirmCode,
    setValue,
    watch,
  } = useForm<{
    code: string;
  }>();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const submit = useCallback(
    async (data: ICreateUser) => {
      setIsLoading(true);

      const response = await createUser(data);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        startCounter();
        setIsCreated(true);
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

  const submitConfirmCode = useCallback(
    async ({ code }: { code: string }) => {
      setIsLoading(true);

      const response = await confirmCode({
        code: Number(code),
        email: getValues("email"),
      });

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/dashboard");
        setIsCreated(true);
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [getValues, push, toast]
  );

  const submitResendCode = useCallback(async () => {
    const response = await resendCode({ email: getValues("email") });

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      startCounter();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
  }, [getValues, startCounter, toast]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center text-3xl">
          {!isCreated ? "Cadastro" : "Confirmar código"}
        </ModalHeader>

        {isCreated ? (
          <form onSubmit={handleSubmitConfirmCode(submitConfirmCode)}>
            <ModalBody className="gap-4 w-full overflow-hidden flex justify-center pt-8 pb-4">
              <div className="flex flex-col gap-4">
                <InputOTP onChange={(e) => setValue("code", e)} maxLength={6}>
                  <InputOTPGroup className="flex justify-center w-full">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="flex w-full gap-2 justify-center items-center">
                  <Link
                    onClick={submitResendCode}
                    isDisabled={isRunning}
                    className="text-center text-sm hover:underline cursor-pointer text-zinc-300"
                  >
                    Reenviar código
                  </Link>
                  {isRunning && (
                    <p className="flex justify-center text-[#D3D3D3]">
                      {formatTime()}
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="py-6">
              <EspecialButton
                disabled={watch("code")?.length !== 6}
                className="w-full active:scale-100"
                type="submit"
                variant="success"
              >
                Confirmar
              </EspecialButton>
            </ModalFooter>
          </form>
        ) : (
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody className="gap-4">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    autoComplete="new-password"
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
                    startContent={<User2 className="text-white/60" size={18} />}
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
                    autoComplete="new-password"
                    size="lg"
                    isInvalid={!!errors.password?.message}
                    errorMessage={errors.password?.message}
                    placeholder="Digite sua senha"
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
              <Controller
                control={control}
                name="confirmPass"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type={isVisibleConfirm ? "text" : "password"}
                    label="Confirmar senha"
                    autoComplete="newPassword"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Digite sua senha"
                    isInvalid={!!errors.confirmPass?.message}
                    errorMessage={errors.confirmPass?.message}
                    startContent={
                      <IoMdLock className="text-white/60" size={18} />
                    }
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityConfirm}
                      >
                        {isVisibleConfirm ? (
                          <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                )}
              />
            </ModalBody>
            <ModalFooter className="flex-col gap-4 pt-6">
              <EspecialButton
                className="w-full"
                type="submit"
                variant="success"
                isLoading={isLoading}
              >
                Cadastrar-se
              </EspecialButton>
            </ModalFooter>
            <p className="w-full text-center text-zinc-300 text-sm pb-6">
              Já possuí cadastro?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLogin();
                  reset();
                }}
                className="hover:text-sky-500 underline cursor-pointer duration-200"
              >
                Entrar
              </button>
            </p>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
