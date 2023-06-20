import {Controller, Render, Get, Res, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Chat } from './chat.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/chat')
  @Render('index')
  Home() {
    return { message: 'Hello world!' };
  }

  @Get('/api/chat')
  async Chat(@Res() res) {
    const messages = await this.appService.getMessages();
    res.json(messages);
  }

  @Get('/api/chat/delete')
  async Delete(@Res() res) {
    await this.appService.clearChat();
  }

  // Clear Individual chat
  @Get('/api/chat/deleteSingle')
  async DeleteSingle(@Query() query: {email : string}) {
    console.log(query.email);
    await this.appService.deleteIndividual(query.email);
  }
}

