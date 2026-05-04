import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';

/** Tipos permitidos para el uploader legacy (UUID → plano en /uploads) */
const ALLOWED_LEGACY = /webp|jpeg|jpg|png|gif|svg\+xml|pdf/;

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    // Multer legacy (solo para POST /upload con diskStorage+UUID)
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: diskStorage({
          destination: config.get<string>('UPLOADS_DIR', './uploads'),
          filename: (_req, file, cb) => {
            cb(null, `${randomUUID()}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
          cb(null, ALLOWED_LEGACY.test(file.mimetype));
        },
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
