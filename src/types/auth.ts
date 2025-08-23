export type LoginValues = {
  emailOrUsername: string;
  password: string;
  remember?: boolean;
};

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
