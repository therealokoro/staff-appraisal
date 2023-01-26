import { Profile, User } from "@prisma/client"

export interface IUser extends User {
  profile: IUserProfile
}

export interface IUserProfile extends Profile {
  account: IUser
}

export type AuthStoreState = {
  user: IUser | null
}

export type AuthCredientials = {
  loginID: string
  password: string
}
