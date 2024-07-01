"use client";
import { TimerProvider } from "@/context/TimerContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { clickScroll } from "@/lib/clickScroll";
import { getCookie } from "@/utils/cookie";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { ClientOnly } from "../ClientOnly";
import { Drawer } from "../Drawer";
import { EspecialButton } from "../EspecialButton";
import { ConfirmSingOut } from "../page/home/ConfirmSignOut";
import { Login } from "../page/home/Login";
import { SingUp } from "../page/home/SingUp";

export default function NavBar() {
  const [scrollActive, setScrollActive] = useState(false);
  const [scale, setScale] = useState(0);
  const mediaQuery768 = useMediaQuery(768);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const email = getCookie("landing.email");
  const name = getCookie("landing.name");
  const userId = getCookie("landing.id");
  const pathname = usePathname();

  const [showActiveAccount, setShowActiveAccount] = useState(false);

  const {
    onClose: onCloseSingUp,
    isOpen: isOpenSingUp,
    onOpen: onOpenSingUp,
  } = useDisclosure();

  const {
    onClose: onCloseLogin,
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
  } = useDisclosure();

  const {
    onClose: onClosePopover,
    isOpen: isOpenPopover,
    onOpen: onOpenPopover,
  } = useDisclosure();

  const {
    onClose: onCloseSingOut,
    isOpen: isOpenSingOut,
    onOpen: onOpenSingOut,
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
        <div className="flex gap-4 w-full justify-between max-w-7xl items-center">
          {pathname === "/home" ? (
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
          ) : (
            <Link
              href={"/home"}
              prefetch={false}
              className="text-2xl p-6 font-bold max-md:opacity-100"
            >
              HIGH <br /> BOOSTER
            </Link>
          )}

          <div className="flex gap-4 w-fit max-md:hidden">
            <EspecialButton onClick={() => clickScroll("assessments")}>
              Avaliações
            </EspecialButton>
            <EspecialButton onClick={() => clickScroll("services")}>
              Serviços
            </EspecialButton>
            <ClientOnly>
              {name || email ? (
                <Popover
                  placement="bottom"
                  className="z-0"
                  isOpen={isOpenPopover}
                  onClose={onClosePopover}
                  onOpenChange={onOpenPopover}
                >
                  <PopoverTrigger>
                    <Avatar
                      name={name}
                      className="border-2 border-spring-green-500 cursor-pointer hover:scale-105 duration-200 hover:shadow-xl"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 flex flex-col gap-3 mt-4">
                    <User
                      as="button"
                      name={name}
                      description={email}
                      className="transition-transform py-2"
                    />
                    <Link
                      href={userId ? "/user/" + userId : ""}
                      className="w-full"
                      prefetch={false}
                    >
                      <EspecialButton className="w-full">
                        Editar perfil
                      </EspecialButton>
                    </Link>
                    <EspecialButton
                      variant="danger"
                      className="w-full"
                      onClick={() => {
                        onOpenSingOut();
                        onClosePopover();
                      }}
                    >
                      Sair
                    </EspecialButton>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <EspecialButton onClick={onOpenSingUp}>
                    Cadastre-se
                  </EspecialButton>
                  <EspecialButton onClick={onOpenLogin}>Login</EspecialButton>
                </>
              )}
            </ClientOnly>
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
          <ClientOnly>
            {(name || email) && (
              <User
                as="div"
                name={name}
                description={email}
                className="transition-transform p-4 bg-zinc-900 w-full max-w-[400px] border border-zinc-700 "
              />
            )}
          </ClientOnly>
          <EspecialButton
            className="w-full max-w-[400px]"
            onClick={() => {
              onClose();
              clickScroll("assessments");
            }}
          >
            Avaliações
          </EspecialButton>
          <EspecialButton
            className="w-full max-w-[400px]"
            onClick={() => {
              onClose();
              clickScroll("services");
            }}
          >
            Serviços
          </EspecialButton>

          <ClientOnly>
            {name || email ? (
              <>
                <Link
                  href={userId ? "/user/" + userId : ""}
                  className="w-full max-w-[400px]"
                  prefetch={false}
                >
                  <EspecialButton
                    className="w-full"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Editar perfil
                  </EspecialButton>
                </Link>
                <EspecialButton
                  variant="danger"
                  className="w-full max-w-[400px]"
                  onClick={() => {
                    onOpenSingOut();
                  }}
                >
                  Sair
                </EspecialButton>
              </>
            ) : (
              <>
                <EspecialButton onClick={onOpenSingUp}>
                  Cadastre-se
                </EspecialButton>
                <EspecialButton onClick={onOpenLogin}>Login</EspecialButton>
              </>
            )}
          </ClientOnly>
        </div>
      </Drawer>
      <Login
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
        onOpenSingUp={onOpenSingUp}
        setShowActiveAccount={setShowActiveAccount}
      />
      <TimerProvider>
        <SingUp
          setShowActiveAccount={setShowActiveAccount}
          showActiveAccount={showActiveAccount}
          isOpen={isOpenSingUp}
          onOpen={onOpenSingUp}
          onClose={onCloseSingUp}
          onOpenLogin={onOpenLogin}
        />
      </TimerProvider>
      <ConfirmSingOut onClose={onCloseSingOut} isOpen={isOpenSingOut} />
    </>
  );
}
