// memory.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { Conversation } from '../conversation/conversation.model';
import { Message } from '../message/message.model';

@Injectable()
export class MemoryService {
  private users: User[] = [];
  private conversations: Conversation[] = [];
  private messages: Message[] = [];

  createUser(name: string): User {
    const user: User = { id: Date.now(), name };
    this.users.push(user);
    return user;
  }

  getUserById(userId: number): User {
    return this.users.find(user => user.id === userId);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  createConversation(userIds: number[]): Conversation {
    const participants: User[] = userIds.map(id => this.getUserById(id));
    const conversation: Conversation = { id: Date.now(), participants };
    this.conversations.push(conversation);
    return conversation;
  }

  getUserConversations(userId: number): Conversation[] {
    return this.conversations.filter(conversation => 
      conversation.participants.some(user => user.id === userId)
    );
  }

  getConversationMessages(conversationId: number): Message[] {
    return this.messages.filter(message => message.conversation.id === conversationId);
  }

  sendMessage(conversationId: number, content: string, senderId: number): Message {
    const sender: User = this.getUserById(senderId);
    const conversation: Conversation = this.conversations.find(conversation => conversation.id === conversationId);
    const message: Message = { id: Date.now(), content, sender, conversation };
    this.messages.push(message);
    return message;
  }
}
