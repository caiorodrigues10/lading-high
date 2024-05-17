import api from "@/services/api";
import { AppResponseNew } from "@/services/types";
import { cookies } from "next/headers";
import ParseQuery from "querystring";

interface IServerRequest {
  pathname: string;
  query?: { name: string; value: string | undefined | number | boolean }[];
  data?: {
    newToken?: string;
  };
}
async function useServer<T>({
  pathname,
  query,
  data,
}: IServerRequest): Promise<AppResponseNew<T>> {
  const token = cookies().get("landing.token")?.value;
  const obj: any = {};
  query &&
    query.forEach((item) => {
      if (item.value) {
        obj[`${item.name}`] = item.value || "";
      }
    });
  const queryString = ParseQuery.stringify(obj);

  const response = await fetch(`${api}/${pathname}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${(data && data.newToken) || token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err.response);

  return response;
}

export { useServer };
