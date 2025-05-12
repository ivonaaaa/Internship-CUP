import { Controller, Get, Res, Req } from '@nestjs/common';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  @Get('*')
  serveFrontend(@Req() req: Request, @Res() res: Response) {
    if (req.url.startsWith('/api')) {
      res.status(404).send('Not Found');
      return;
    }

    res.sendFile(
      join(__dirname, '..', '..', '..', 'frontend', 'dist', 'index.html'),
    );
  }
}
