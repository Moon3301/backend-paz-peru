import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '../entities/admin.entity';

export const ROLES_KEY = 'roles';

/** Marca un endpoint/controller como restringido a los roles indicados. */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
