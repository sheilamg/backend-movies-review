import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthAdminGuard } from 'src/auth/auth.admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@ApiBearerAuth()
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  //@UseGuards(AuthAdminGuard)
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req){
    return req.user
  }

  //@UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() loginDto: CreateLoginDto) {
    return this.loginService.createJWT(loginDto);
  }


}
