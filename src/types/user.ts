export type Role = "user" | "admin" | string;

export interface User {
  id: string;
  name: string;
  email: string;
  roles?: Role[];
  photo: string;
}

export type AccountDetailsValues = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  photo?: FileList | null;
};
