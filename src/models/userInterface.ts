export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserReq {
  login: string;
  password: string;
  age: number;
}
