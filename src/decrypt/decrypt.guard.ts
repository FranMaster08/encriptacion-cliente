import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class DecryptGuard implements CanActivate {
  private readonly pubicKey: string;

  constructor() {
    // Carga la clave privada desde un archivo o variable de entorno
    this.pubicKey = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyjFpIBsDEFzDEPZeUxwV\nTcvd1Q7t8e9JjWGyz/Dgc2MAbnxNOsCxQaV0cTLj94gx38nm0xc3qlv58m7eE60C\n5RUhNd4MZnSmiMyj3c/Pugz0WDz6QuIvnAIcqc67DbomrnL39DB+eUDl0M/GmtEY\nAPtYPVe8m2WoC8/Khqc8OHSAPyEwXUMnI2iz/2XA/4WhA0eYZSXvsAESn9YnBNgq\noKRGh7wAsP783rJCPLe7Hjaa2GFNDTB/fa3gcU+WDfX6/sP5lv3G8OfDdMbhW1x7\nKS2P/Xo3pkU8YrgAVUfoXwSX08sqBSiCH4YuHAodn5Sr1qz21Y41eGlccr6P0E4L\nCQIDAQAB\n-----END PUBLIC KEY-----\n`;
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Asume que el token viene en el header Authorization: Bearer <token>

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      // Descifrar el token utilizando la clave privada
      const decryptedToken = crypto
        .publicDecrypt(this.pubicKey, Buffer.from(token, 'base64'))
        .toString('utf8');

      // Añadir el token descifrado al request para ser utilizado en los controladores
      request['decryptedToken'] = decryptedToken;

      return true;
    } catch (error) {
      console.error('Error al descifrar el token:', error);
      throw new UnauthorizedException(
        'Token inválido o error en el descifrado',
      );
    }
  }
}
