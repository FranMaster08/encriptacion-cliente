export class CreateUserDto {}
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'user@example.com',
  })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  password: string;
}
