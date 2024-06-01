import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';

export type AuthInfo = {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean
}
export type AuthRequest = {
  auth?: AuthInfo
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        error_description: 'Unauthorized',
        error_code: 'UNAUTHORIZED',
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_CONSTANTS_SECRET,
      });
      request['auth'] = payload;
    } catch {
      throw new ForbiddenException({ message: 'Invalid Token' });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
