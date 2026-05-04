import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { unlink, readdir, stat, mkdir, writeFile } from 'fs/promises';
import { join, relative, extname, basename } from 'path';
import { Media } from './entities/media.entity';

export interface FileNode {
  name: string;
  path: string;       // relativo a uploads/
  type: 'folder' | 'file';
  url?: string;
  mimeType?: string;
  sizeBytes?: number;
  children?: FileNode[];
}

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml',
  pdf: 'application/pdf',
  mp4: 'video/mp4', webm: 'video/webm',
  woff: 'font/woff', woff2: 'font/woff2',
};

function mimeOf(filename: string): string {
  const ext = extname(filename).replace('.', '').toLowerCase();
  return MIME[ext] ?? 'application/octet-stream';
}

function sanitizeName(original: string): string {
  const ext = extname(original);
  const base = basename(original, ext)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '');
  return `${base}${ext.toLowerCase()}`;
}

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    private readonly config: ConfigService,
  ) {}

  private get uploadsDir(): string {
    return this.config.get<string>('UPLOADS_DIR', './uploads');
  }

  private get baseUrl(): string {
    return this.config.get<string>('UPLOADS_URL', 'http://localhost:3000/uploads');
  }

  // ── Registro de media ──────────────────────────────────────────────────────

  async saveUpload(
    file: Express.Multer.File,
    entityType?: string,
    entityId?: number,
  ): Promise<Media> {
    const media = this.mediaRepo.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      url: `${this.baseUrl}/${file.filename}`,
      storageType: 'local',
      entityType,
      entityId,
    });
    return this.mediaRepo.save(media);
  }

  async findAll(): Promise<Media[]> {
    return this.mediaRepo.find({ order: { createdAt: 'DESC' } });
  }

  async remove(id: number): Promise<void> {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) throw new NotFoundException(`Media ${id} no encontrado`);
    const filePath = join(this.uploadsDir, media.filename);
    try { await unlink(filePath); } catch { /* ya no existe */ }
    await this.mediaRepo.remove(media);
  }

  // ── Media Manager: listar árbol ────────────────────────────────────────────

  async listFiles(subpath?: string): Promise<FileNode[]> {
    const base = this.uploadsDir;
    const target = subpath ? join(base, subpath) : base;
    return this.walkDir(target, base);
  }

  private async walkDir(dir: string, base: string): Promise<FileNode[]> {
    let entries: import('fs').Dirent[];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return [];
    }
    const nodes: FileNode[] = [];
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relPath = relative(base, fullPath).replace(/\\/g, '/');
      if (entry.isDirectory()) {
        nodes.push({
          name: entry.name,
          path: relPath,
          type: 'folder',
          children: await this.walkDir(fullPath, base),
        });
      } else {
        let sizeBytes = 0;
        try { sizeBytes = (await stat(fullPath)).size; } catch { /* ok */ }
        nodes.push({
          name: entry.name,
          path: relPath,
          type: 'file',
          url: `${this.baseUrl}/${relPath}`,
          mimeType: mimeOf(entry.name),
          sizeBytes,
        });
      }
    }
    // carpetas primero, luego archivos, ambos alfabéticos
    return nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name, 'es');
    });
  }

  // ── Media Manager: subir a carpeta específica ──────────────────────────────

  async uploadToFolder(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ path: string; url: string; name: string }> {
    // Limpiar la ruta de carpeta para evitar path traversal
    const cleanFolder = folder
      .replace(/\.\./g, '')
      .replace(/^\/+/, '')
      .trim();

    const targetDir = cleanFolder
      ? join(this.uploadsDir, cleanFolder)
      : this.uploadsDir;

    await mkdir(targetDir, { recursive: true });

    const safeName = sanitizeName(file.originalname);

    // Si ya existe, agregar timestamp para no sobreescribir
    const ext = extname(safeName);
    const base = basename(safeName, ext);
    let finalName = safeName;
    try {
      await stat(join(targetDir, safeName));
      finalName = `${base}-${Date.now()}${ext}`;
    } catch { /* no existe, usar nombre limpio */ }

    await writeFile(join(targetDir, finalName), file.buffer);

    const relPath = (cleanFolder ? `${cleanFolder}/${finalName}` : finalName).replace(/\\/g, '/');
    return {
      name: finalName,
      path: relPath,
      url: `${this.baseUrl}/${relPath}`,
    };
  }

  // ── Media Manager: eliminar archivo por ruta ──────────────────────────────

  async deleteByPath(relPath: string): Promise<void> {
    // Evitar path traversal
    const clean = relPath.replace(/\.\./g, '').replace(/^\/+/, '');
    const fullPath = join(this.uploadsDir, clean);
    await unlink(fullPath);
  }

  // ── Media Manager: crear carpeta ──────────────────────────────────────────

  async createFolder(relPath: string): Promise<void> {
    const clean = relPath.replace(/\.\./g, '').replace(/^\/+/, '');
    await mkdir(join(this.uploadsDir, clean), { recursive: true });
  }
}
