import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

// ── Autenticación (pública) ───────────────────────────────────────────────

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /api/auth/login — devuelve JWT + datos del usuario */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}

// ── Perfil del usuario autenticado ───────────────────────────────────────

@Controller('auth')
export class AuthMeController {
  constructor(private readonly authService: AuthService) {}

  /** GET /api/auth/me — requiere JWT válido */
  @Get('me')
  getMe(@Request() req: { user: { sub: number } }) {
    return this.authService.getMe(req.user.sub);
  }
}
