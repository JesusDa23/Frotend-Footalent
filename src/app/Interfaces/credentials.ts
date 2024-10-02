export interface Credentials {
  email: string;
  password: string;
}

export interface UserInfo {
  dni: string
  name: string
  email: string
  password: string
  rol: string
}


export interface resLoginUser {
  message: string
  token: string
  user: UserInfo
}
