import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {

  @Get('/')
  getHello(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return res.status(200).send(req.query);
  }

  @Post('/')
  postHello(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return res.status(200).send(req.query);
  }

}
