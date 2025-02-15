const loginRoute = '/auth/login'
type LoginRequestDTO = {
  email: string;
  password: string;
};

export { LoginRequestDTO, loginRoute };
