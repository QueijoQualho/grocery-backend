import { Role } from '../../user/enum/role.enum';

export interface UserPayload {
  sub: number;
  email: string;
  username: string;
  roles: Role[];
}
