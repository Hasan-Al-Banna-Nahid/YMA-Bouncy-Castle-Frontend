export type Role = "user" | "admin" | string;

export interface User {
  id: string;
  name: string;
  email: string;
  roles?: Role[];
  photo: string;
}

export type AccountDetailsValues = {
  name: string;
  email: string;
  currentPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  photo: FileList | null | undefined;
};
