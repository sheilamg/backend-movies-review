import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/utils/hashPassword.utils';

@Injectable()
export class LoginService {
  constructor(
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
){}

  async createJWT(loginDto: CreateLoginDto){
    const {email, password} = loginDto

    const user = await this.usersService.findOneByEmail(email.toLowerCase())

    if(!user){
      throw new HttpException('This Email doesnt exits', HttpStatus.CONFLICT)
    }

    if(user.password === undefined){
      throw new HttpException('it seems like this is undefined..', HttpStatus.CONFLICT)
    }

    const verificarPass = await verifyPassword(password, user.password)

    if(!verifyPassword){
      throw new HttpException('Incorrect password, try again', HttpStatus.CONFLICT)
    }

    const payload = { user: { email: email, password: password} }
    const token = await this.jwtService.signAsync(payload)

    return{
      token: token,
      user: user,
      email: user.email,
      role: user.role.name,
    }
  }

}
