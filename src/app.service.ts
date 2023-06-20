import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  async createMessage(chat: Chat): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }

  async clearChat(): Promise<any> {
    await this.chatRepository.clear()
    return {status: 200, message: "Successful"};
  }

  async deleteIndividual(email: string) {
    // will delete all the entries by a single user
    return await this.chatRepository.delete({
      email: email
    });
  }
}
