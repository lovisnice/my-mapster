import {Status} from "../../utils/enums";

export interface ILogin {
    email: string,
    password: string,
}

export interface IUser{
    name: string,
    email: string,
    image: string,
}

export interface IUserRole{
    name: string,
    email: string,
    image: string,
    roles: string[]
}
export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    status: Status;
}

export interface IAccountStateRole {
    user: IUserRole | null,
    token: string | null,
    isLogin: boolean,
    status: Status;
}
export interface IRegister {
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    phone: string,
}