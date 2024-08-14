import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password is wrong');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const payload = { sub: user.id, username: user.login };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };

  }
  async register(login: string, email: string, password: string): Promise<{ access_token: string }> {
    const existUser = await this.userService.findOneByEmail(email);
    if (existUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userService.create({login, email, password:hash});

    const payload = { sub: user.id, username: user.login };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };

  }

}
