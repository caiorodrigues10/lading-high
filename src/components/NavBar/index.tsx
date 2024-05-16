"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { clickScroll } from "@/lib/clickScroll";
import { Button, useDisclosure } from "@nextui-org/react";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Drawer } from "../Drawer";
import { EspecialButton } from "../EspecialButton";
import { Login } from "../page/home/Login";

export default function NavBar() {
  const [scrollActive, setScrollActive] = useState(false);
  const [scale, setScale] = useState(0);
  const mediaQuery768 = useMediaQuery(768);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    onClose: onCloseLogin,
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
  } = useDisclosure();

  useEffect(() => {
    function checkScrollPosition() {
      var scrollPosition = window.scrollY || window.pageYOffset;

      var size = 320;

      if (scrollPosition >= size - 10 && scale <= 1) {
        setScale(0.4 + (0.1 * (scrollPosition - (size - 10))) / 100);
      }

      if (scrollPosition >= size) {
        setScrollActive(true);
      } else {
        setScrollActive(false);
        setScale(0);
      }
    }
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [scale]);

  return (
    <>
      <nav
        className={clsx(
          "w-full fixed top-0 justify-center flex px-10 z-10 backdrop-blur-sm bg-gradient-to-t from-[#00000010] to-[#000000]"
        )}
      >
        <div className="flex gap-4 w-full justify-between max-w-7xl items-center ">
          <p
            className={clsx(
              "text-2xl opacity-0 p-6 font-bold max-md:opacity-100",
              {
                "opacity-100": scrollActive,
              }
            )}
            style={{ scale: mediaQuery768 ? 1 : scale }}
          >
            HIGH <br /> BOOSTER
          </p>
          <div className="flex gap-4 w-fit max-md:hidden">
            <EspecialButton onClick={() => clickScroll("assessments")}>
              Avaliações
            </EspecialButton>
            <EspecialButton onClick={() => clickScroll("services")}>
              Serviços
            </EspecialButton>
            <EspecialButton>Cadastre-se</EspecialButton>
            <EspecialButton onClick={onOpenLogin}>Login</EspecialButton>
          </div>
          <Button
            variant="light"
            className="bg-zinc-400/10 rounded-md px-3 h-auto py-2.5 !min-w-fit hover:bg-zinc-400/20 duration-200 md:hidden text-white"
            onClick={onOpen}
          >
            <IoIosMenu size={24} />
          </Button>
        </div>
      </nav>
      <Drawer className="p-6 flex flex-col gap-6" isOpen={isOpen}>
        <div className="flex w-full justify-between items-center">
          <p className={clsx("text-2xl font-bold")}>
            HIGH <br /> BOOSTER
          </p>
          <Button
            variant="light"
            className="bg-zinc-400/10 rounded-md px-3 h-auto py-3 hover:text-red-500 !min-w-fit hover:bg-zinc-400/20 duration-200 text-white"
            onClick={onClose}
          >
            <IoMdClose size={24} />
          </Button>
        </div>
        <hr className="h-[1px] w-full bg-zinc-400 border-0" />
        <div className="flex flex-col w-full h-full gap-4 items-center">
          <EspecialButton className="w-full max-w-[400px]">
            Ofertas
          </EspecialButton>
          <EspecialButton className="w-full max-w-[400px]">
            Cadastre-se
          </EspecialButton>
          <EspecialButton
            className="w-full max-w-[400px]"
            onClick={onOpenLogin}
          >
            Login
          </EspecialButton>
        </div>
      </Drawer>
      <Login isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
}
