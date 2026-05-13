/**
 * Seed — primer usuario administrador
 *
 * Uso:
 *   npm run seed:admin
 *
 * Variables de entorno leídas desde .env:
 *   ADMIN_NAME     — nombre del usuario  (default: "Administrador")
 *   ADMIN_EMAIL    — email               (default: "admin@paz.pe")
 *   ADMIN_PASSWORD — contraseña en texto (default: "Paz2026!")
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/auth/entities/admin.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type:       'mariadb',
  host:       process.env.DB_HOST     || 'localhost',
  port:       parseInt(process.env.DB_PORT || '3306'),
  username:   process.env.DB_USERNAME || 'paz_user',
  password:   process.env.DB_PASSWORD || '1234',
  database:   process.env.DB_DATABASE || 'paz_peru',
  entities:   [Admin],
  synchronize: false,          // no tocar otras tablas
  charset:    'utf8mb4',
});

async function run(): Promise<void> {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Admin);

  const name     = process.env.ADMIN_NAME     || 'Administrador';
  const email    = process.env.ADMIN_EMAIL    || 'admin@paz.pe';
  const password = process.env.ADMIN_PASSWORD || 'Paz2026!';

  const existing = await repo.findOne({ where: { email } });
  if (existing) {
    console.log(`✔  El usuario "${email}" ya existe — no se realizaron cambios.`);
    await AppDataSource.destroy();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = repo.create({
    name,
    email,
    passwordHash,
    role:     'admin',
    isActive: true,
  });

  await repo.save(admin);
  console.log('✅  Usuario administrador creado exitosamente:');
  console.log(`   Nombre : ${name}`);
  console.log(`   Email  : ${email}`);
  console.log(`   Rol    : admin`);
  console.log('');
  console.log('⚠️  Recuerda cambiar la contraseña en producción.');

  await AppDataSource.destroy();
}

run().catch((err) => {
  console.error('❌  Error al crear el usuario administrador:', err);
  process.exit(1);
});
