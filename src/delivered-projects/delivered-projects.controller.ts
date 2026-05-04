import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { DeliveredProjectsService } from './delivered-projects.service';
import { CreateDeliveredProjectDto } from './dto/create-delivered-project.dto';
import { UpdateDeliveredProjectDto } from './dto/update-delivered-project.dto';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('delivered-projects')
export class DeliveredProjectsPublicController {
  constructor(private readonly service: DeliveredProjectsService) {}

  @Get()
  findAll() {
    return this.service.findAllPublic();
  }
}

@Controller('admin/delivered-projects')
export class DeliveredProjectsAdminController {
  constructor(private readonly service: DeliveredProjectsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDeliveredProjectDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDeliveredProjectDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
