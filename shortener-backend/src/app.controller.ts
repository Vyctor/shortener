import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':key')
  async returnLink(@Param() params: { key: string }) {
    const { key } = params;

    if (!key) throw new NotFoundException('Key not found');

    const url = await this.appService.getLink({ key });

    if (!url) throw new NotFoundException('Link not found');

    return url;
  }

  @Post()
  async shortenLink(@Body() url: string) {
    const shortenedLink = await this.appService.shortenLink({
      url,
    });

    return {
      link: shortenedLink,
    };
  }
}
