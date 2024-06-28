export interface UserDto {
  userName: string;
  password: string;
  createdAt?: Date;
}

export interface RegisterUser{

  id: string;
  userName: string;
  token: string;
  message?: string;
}
