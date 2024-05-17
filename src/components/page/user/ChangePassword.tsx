"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/services/users/client";
import { IEditUser } from "@/services/users/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import * as y from "yup";

interface IChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const changePasswordSchema = y.object().shape({
  oldPassword: y.string().required("Senha atual é obrigatória"),
  newPassword: y.string().required("Nova senha é obrigatória"),
  confirmPass: y.string().required("Confirmar senha é obrigatória"),
});

type IChangePasswordSchema = y.InferType<typeof changePasswordSchema>;

export function ChangePassword({ isOpen, onClose, id }: IChangePasswordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema),
  });

  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityOld = () => setIsVisibleOld(!isVisibleOld);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const submit = useCallback(
    async (data: IEditUser) => {
      setIsLoading(true);

      const response = await editUser(data, id);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        reset();
        refresh();
        onClose();
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [toast, refresh, reset, onClose, id]
  );

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
          Login
        </ModalHeader>
        <form onSubmit={handleSubmit(submit)}>
          <ModalBody className="flex flex-col gap-6">
            <Controller
              control={control}
              name="oldPassword"
              render={({ field }) => (
                <TextInput
                  {...field}
                  type={isVisibleOld ? "text" : "password"}
                  label="Senha atual"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Digite sua senha"
                  isInvalid={!!errors.oldPassword?.message}
                  errorMessage={errors.oldPassword?.message}
                  startContent={
                    <IoMdLock className="text-white/60" size={18} />
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityOld}
                    >
                      {isVisibleOld ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <div className="flex gap-4">
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    type={isVisibleNew ? "text" : "password"}
                    label="Nova senha"
                    labelPlacement="outside"
                    autoComplete="new-password"
                    size="lg"
                    isInvalid={!!errors.newPassword?.message}
                    errorMessage={errors.newPassword?.message}
                    placeholder="Digite sua nova senha"
                    startContent={
                      <IoMdLock className="text-white/60" size={18} />
                    }
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityNew}
                      >
                        {isVisibleNew ? (
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
            </div>
          </ModalBody>
          <ModalFooter>
            <EspecialButton
              type="button"
              variant="danger"
              disabled={isLoading}
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancelar
            </EspecialButton>
            <EspecialButton
              variant="success"
              type="submit"
              isLoading={isLoading}
            >
              Alterar senha
            </EspecialButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
