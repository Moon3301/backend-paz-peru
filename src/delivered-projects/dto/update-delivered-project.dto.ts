import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveredProjectDto } from './create-delivered-project.dto';

export class UpdateDeliveredProjectDto extends PartialType(CreateDeliveredProjectDto) {}
