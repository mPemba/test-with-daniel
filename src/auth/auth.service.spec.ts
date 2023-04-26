import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if the password is less than eight characters', async () => {
    const user = {
      id: '123',
      username: 'test',
      email: 'test@gmail.com',
      password: 'test',
    };

    try {
      await service.create(user);
    } catch (error) {
      expect(error.message).toEqual('Password must be at least 8 characters');
    }

    expect.assertions(1);
  });

  it('should throw an error if the email is invalid', async () => {
    const user = {
      id: '123',
      username: 'test',
      email: 'test',
      password: 'testpassword',
    };

    try {
      await service.create(user);
    } catch (error) {
      expect(error.message).toEqual('Invalid email');
    }

    expect.assertions(1);
  });

  it('should throw an error if the email already exists', async () => {
    const user = {
      id: '123',
      username: 'test',
      email: 'existingemail@gmail.com',
      password: 'testpassword',
    };

    try {
      await service.create(user);
    } catch (error) {
      expect(error.message).toEqual('Email already exists');
    }

    expect.assertions(1);
  });

  it('should throw an error if the username already exists', async () => {
    const user = {
      id: '123',
      username: 'existingusername',
      email: 'test@gmail.com',
      password: 'testpassword',
    };

    try {
      await service.create(user);
    } catch (error) {
      expect(error.message).toEqual('Username already exists');
    }

    expect.assertions(1);
  });

  it('should successfully create a user', async () => {
    const user = {
      id: '123',
      username: 'testUsername',
      email: 'test@gmail.com',
      password: 'testpassword',
    };

    const newUser = await service.create(user);

    expect(newUser).toEqual({
      id: expect.any(String),
      username: 'testusername',
      email: 'test@gmail.com',
      password: expect.any(String),
    });
  });
});
