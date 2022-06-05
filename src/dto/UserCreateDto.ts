export interface UserCreateDto {
  id?: string;
  email: string;
  password: string;
  login: string;
  role: 'ADMIN' | 'USER';
}
