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
  isFirstLogin: boolean;
}


export interface resLoginUser {
  message: string
  token: string
  user: UserInfo
}

export interface CreateDriver {
  dni: string
  name: string
  email: string
  password: string
  phone: string
  address: string
  licencia: string
  tipoLicencia: string,
  vencimiento: string,
  rol: string
  isFirstLogin: boolean;
}
