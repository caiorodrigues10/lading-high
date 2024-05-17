"use client";
import { EspecialButton } from "@/components/EspecialButton";
import { useToast } from "@/components/ui/use-toast";
import { clearCookies } from "@/utils/cookie";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function ConfirmSingOut({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const signOut = useCallback(async () => {
    setIsLoading(true);
    clearCookies();
    await fetch("/api/revalidate");
    refresh();
    toast({
      description: "Você saiu da plataforma!",
      title: "Sucesso!",
      className: "toast-success",
    });
    onClose();
    setIsLoading(false);
  }, [refresh, onClose, toast]);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <ModalHeader className="flex justify-center text-3xl">Sair</ModalHeader>
        <ModalBody className="pt-6 text-lg text-center pb-4">
          Tem certeza que deseja sair?
        </ModalBody>
        <ModalFooter className="flex gap-4 pt-6 justify-center">
          <EspecialButton
            type="submit"
            className="w-full"
            variant="danger"
            onClick={onClose}
          >
            Cancelar
          </EspecialButton>
          <EspecialButton
            type="submit"
            className="w-full"
            variant="success"
            isLoading={isLoading}
            onClick={signOut}
          >
            Sim
          </EspecialButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
