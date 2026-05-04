import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Public } from '../auth/decorators/public.decorator';

// ── Endpoint público ───────────────────────────────────────────────────────

@Public()
@Controller('districts')
export class DistrictsPublicController {
  constructor(private readonly service: DistrictsService) {}

  @Get()
  findAll() {
    return this.service.findAllPublic();
  }
}

// ── Endpoints de administración ────────────────────────────────────────────

@Controller('admin/districts')
export class DistrictsAdminController {
  constructor(private readonly service: DistrictsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDistrictDto) {
    console.log(dto);
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDistrictDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.service.toggleActive(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
