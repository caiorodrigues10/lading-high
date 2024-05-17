import { AppResponse } from "@/services/types";

interface ISendEmailForgotPassword {
  email: string;
}
interface ICreateUser {
  email: string;
  name: string;
  password: string;
  confirmPass: string;
  userPermissionsId?: string;
}

interface IEditUser {
  email?: string;
  name?: string;
  password?: string;
  confirmPass?: string;
  userPermissionsId?: string;
  oldPassword?: string;
}

interface IVerifyTokenForgotPassword {
  token: string;
}

interface IPermissions {
  description: string;
  id: string;
  tagPermission: string;
}

interface IUser {
  email: string;
  id: string;
  name: string;
  active: false;
  createdAt: string;
  userpermissions: IPermissions;
}

interface IListUserResponse {
  list: IUser[];
  count: number;
}

interface IEditUserResponse extends AppResponse {
  data: IUser;
}

export type {
  ISendEmailForgotPassword,
  ICreateUser,
  IUser,
  IListUserResponse,
  IVerifyTokenForgotPassword,
  IPermissions,
  IEditUser,
  IEditUserResponse,
};
