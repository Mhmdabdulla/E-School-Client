export interface IUser {
    _id:string
    name: string;
    email: string;
    password: string;
    phoneNo?:string;
    profileImageUrl?: string;
    googleId?:string
    status:string;
    role: string;
    title?: string;
    createdAt: Date;
    updatedAt: Date;
  }