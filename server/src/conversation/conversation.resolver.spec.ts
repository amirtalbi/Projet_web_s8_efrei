import { Test, TestingModule } from '@nestjs/testing';
import { ConversationResolver } from './conversation.resolver';
import { MemoryService } from '../memory/memory.service';
import { Conversation } from './conversation.model';
import { Message } from '../message/message.model';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

describe('ConversationResolver', () => {
  let resolver: ConversationResolver;
  let memoryService: MemoryService;
  let messageQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationResolver,
        {
          provide: MemoryService,
          useValue: {
            getUserConversations: jest.fn(),
            getConversationMessages: jest.fn(),
            createConversation: jest.fn(),
            sendMessage: jest.fn(),
          },
        },
        {
          provide: getQueueToken('message-queue'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ConversationResolver>(ConversationResolver);
    memoryService = module.get<MemoryService>(MemoryService);
    messageQueue = module.get<Queue>(getQueueToken('message-queue'));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUserConversations', () => {
    it('should return an array of conversations', async () => {
      const result: Conversation[] = [
        {
          id: 1,
          participants: [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
          ],
          messages: [
            { id: 1, content: 'Hello', sender: { id: 1, name: 'User 1' }, conversation: { id: 1, participants: [] } },
          ],
        },
      ];
      jest.spyOn(memoryService, 'getUserConversations').mockResolvedValue(result as never);

      expect(await resolver.getUserConversations(1)).toBe(result);
    });
  });

  describe('getConversationMessages', () => {
    it('should return an array of messages', async () => {
      const result: Message[] = [
        { id: 1, content: 'Hello', sender: { id: 1, name: 'User 1' }, conversation: { id: 1, participants: [] } },
      ];
      jest.spyOn(memoryService, 'getConversationMessages').mockResolvedValue(result as never);

      expect(await resolver.getConversationMessages(1)).toBe(result);
    });
  });

  describe('createConversation', () => {
    it('should create a new conversation', async () => {
      const result: Conversation = {
        id: 1,
        participants: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ],
      };
      jest.spyOn(memoryService, 'createConversation').mockResolvedValue(result as never);

      expect(await resolver.createConversation([1, 2])).toBe(result);
    });
  });

  describe('sendMessage', () => {
    it('should add a message to the queue and return the message', async () => {
      const result: Message = {
        id: 1,
        content: 'Hello',
        sender: { id: 1, name: 'User 1' },
        conversation: { id: 1, participants: [] },
      };
      jest.spyOn(memoryService, 'sendMessage').mockResolvedValue(result as never);

      expect(await resolver.sendMessage(1, 'Hello', 1)).toBe(result);
      expect(messageQueue.add).toHaveBeenCalledWith('send-message', {
        conversationId: 1,
        content: 'Hello',
        senderId: 1,
      });
    });
  });
});