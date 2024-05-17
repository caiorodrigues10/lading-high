import { BodyPage } from "@/components/BodyPage";
import { UserPage } from "@/components/page/user/UserPage";
import { useServer } from "@/lib/useServer";
import { IUser } from "@/services/users/types";
import { redirect } from "next/navigation";

export default async function UserByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await useServer<IUser>({
    pathname: "users/" + params.id,
  });

  if (!user || !user?.data) {
    return redirect("/");
  }

  return (
    <BodyPage>
      <UserPage data={user.data} />
    </BodyPage>
  );
}
