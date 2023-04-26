import { Controller } from '@nestjs/common';
import { Post, Body, Get, Req } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.authService.create(createUserDto);
      if (response) {
        return {
          description: 'User created successfully',
          data: response,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        description: 'Error creating user',
        data: error,
      };
    }
  }

  @Get('all')
  async findAll() {
    try {
      const response = await this.authService.findAll();
      if (response) {
        return {
          description: 'Users found successfully',
          data: response,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        description: 'Error finding users',
        data: error,
      };
    }
  }
}
