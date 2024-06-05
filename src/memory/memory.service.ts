// memory.service.ts
import { Injectable } from '@nestjs/common';
import { Conversation } from '../conversation/conversation.model';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';

@Injectable()
export class MemoryService {
  private messages: Message[] = [];
  private users: User[] = [
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
  ];
  private conversations: Conversation[] = [
    { id: 1, participants: [this.users[0], this.users[1]], messages: [] },
  ];

  createUser(name: string): User {
    const user: User = { id: Date.now(), name };
    this.users.push(user);
    return user;
  }

  getUserById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  createConversation(userIds: number[]): Conversation {
    const participants: User[] = userIds.map((id) => this.getUserById(id));
    const conversation: Conversation = { id: Date.now(), participants };
    this.conversations.push(conversation);
    return conversation;
  }

  getUserConversations(userId: number): Conversation[] {
    return this.conversations.filter((conversation) =>
      conversation.participants.some((user) => user.id === userId),
    );
  }

  getConversationMessages(conversationId: number): Message[] {
    return this.messages.filter(
      (message) => message.conversation.id === conversationId,
    );
  }

  private getConversationById(id: number): Conversation {
    return this.conversations.find((conversation) => conversation.id === id);
  }

  sendMessage(
    conversationId: number,
    content: string,
    senderId: number,
  ): Message {
    const sender = this.getUserById(senderId);
    const conversation = this.getConversationById(conversationId);
    if (!sender || !conversation) {
      throw new Error('Invalid sender or conversation');
    }

    const message = {
      id: this.messages.length + 1,
      content,
      sender,
      conversation,
    };
    this.messages.push(message);
    conversation.messages.push(message);
    return message;
  }
}
