import { User } from "@/store/authSlice";

export interface ISuccessResponse<T> {
    success?: boolean;
    message?: string;
    data: T;
    admin?: User
}