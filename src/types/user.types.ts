export interface IUser {
  _id: string;
  email: string;
  role: string;
  status: string;
  profile: {
    fullName: string;
    address: string;
    avatar: string;
    bio?: string;
    organization?: string;
    phone?: string;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}
