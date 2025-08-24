export type Role = "user" | "admin" | string;

export interface User {
  id: string;
  name: string;
  email: string;
  roles?: Role[];
  photo: string;
}
