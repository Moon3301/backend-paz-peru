import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class UnitsQueryDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  projectId: number;
}
