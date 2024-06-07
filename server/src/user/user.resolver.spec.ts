import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { MemoryService } from '../memory/memory.service';
import { User } from './user.model';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let memoryService: MemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: MemoryService,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    memoryService = module.get<MemoryService>(MemoryService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

describe('getAllUsers', () => {
    it('should return an array of users', async () => {
        const result: User[] = [{ id: 1, name: 'User1' }];
        jest.spyOn(memoryService, 'getAllUsers').mockResolvedValue(result as never);

        expect(await resolver.getAllUsers()).toBe(result);
    });
});

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const result: User = { id: 1, name: 'User1' };
      jest.spyOn(memoryService, 'getUserById').mockResolvedValue(result as never);

      expect(await resolver.getUserById(1)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const result: User = { id: 1, name: 'NewUser' };
      jest.spyOn(memoryService, 'createUser').mockResolvedValue(result as never);

      expect(await resolver.createUser('NewUser')).toBe(result);
    });
  });
});