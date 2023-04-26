import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly users: CreateUserDto[] = [
    {
      id: '123',
      email: 'existingemail@gmail.com',
      username: 'existingusername',
      password: 'password',
    },
  ];

  async hashPassword(password: string) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  // stole this from StackOverflow 😎
  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  // make sure email is valid and doesn't already exist
  async checkEmail(email: string) {
    if (!this.validateEmail(email.toLowerCase())) {
      throw new Error('Invalid email');
    }

    if (this.users.find((u) => u.email === email.toLowerCase())) {
      throw new Error('Email already exists');
    }

    return true;
  }

  // make sure username doesn't already exist
  async checkUsername(username: string) {
    if (this.users.find((u) => u.username === username.toLowerCase())) {
      throw new Error('Username already exists');
    }

    return true;
  }

  async create(user: CreateUserDto) {
    const hashedPW = await this.hashPassword(user.password);
    const emailCheck = await this.checkEmail(user.email);
    const usernameCheck = await this.checkUsername(user.username);

    if (emailCheck && usernameCheck) {
      this.users.push({
        id: uuidv4(),
        email: user.email.toLowerCase(),
        username: user.username.toLowerCase(),
        password: hashedPW.toString(),
      });

      return this.users.find((u) => u.email === user.email.toLowerCase());
    }
  }

  async findAll() {
    return this.users;
  }
}
