import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthServiceClient } from '../client/auth.client';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const apiKey = 'thv-front-core'; // La API key correspondiente

    // Llama al cliente AuthServiceClient para enviar la petición al servicio de autenticación
    const response = await AuthServiceClient({ apiKey, username, password });

    if (response && response.token) {
      return { token: response.token };
    } else {
      throw new BadRequestException(
        'Error al iniciar sesión o credenciales inválidas',
      );
    }
  }
}
