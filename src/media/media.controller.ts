import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Query,
  Body,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MediaService } from './media.service';

@Controller('admin/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // ── Registro de media (upload legacy con UUID) ────────────────────────────

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.mediaService.saveUpload(
      file,
      entityType,
      entityId ? parseInt(entityId, 10) : undefined,
    );
  }

  // ── Media Manager ─────────────────────────────────────────────────────────

  /** Árbol de carpetas y archivos del directorio uploads */
  @Get('files')
  listFiles(@Query('folder') folder?: string) {
    return this.mediaService.listFiles(folder);
  }

  /** Subir archivo a una carpeta específica dentro de uploads */
  @Post('manager-upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }))
  managerUpload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.mediaService.uploadToFolder(file, folder ?? '');
  }

  /** Eliminar un archivo por su ruta relativa — debe declararse ANTES de @Delete(':id')
   *  para que NestJS/Express no interprete 'files' como un ID numérico. */
  @Delete('files')
  @HttpCode(204)
  deleteFile(@Query('path') path: string) {
    return this.mediaService.deleteByPath(path);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.remove(id);
  }

  /** Crear una carpeta vacía */
  @Post('folders')
  @HttpCode(201)
  createFolder(@Body('path') path: string) {
    return this.mediaService.createFolder(path);
  }
}
