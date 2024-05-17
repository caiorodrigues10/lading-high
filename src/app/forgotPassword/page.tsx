import { FormChangePassword } from "@/components/page/forgotPassword/FormChangePassword";
import { useServer } from "@/lib/useServer";
import { IVerifyTokenForgotPassword } from "@/services/users/types";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const validToken = await useServer<IVerifyTokenForgotPassword>({
    pathname: "confirm/validateToken/" + searchParams.token,
  });

  if (!validToken || validToken?.result !== "success") {
    return redirect("/login");
  }

  return (
    <div className="flex w-full h-full min-h-screen min-w-screen justify-center items-center p-8">
      <FormChangePassword token={searchParams.token || ""} />
    </div>
  );
}
