import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/utils/hashPassword.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  //async create_user(data_user: CreateUserDto) {
  //  const new_user: CreateUserDto = this.userRepository.create(data_user)
  //  return await this.userRepository.save(new_user)
  //}

  //create for login and register, with hashed password
  async create(createUser: CreateUserDto){
    const checkEmailExistence = await this.userRepository.findOne({where: {email: createUser.email}})
    if(checkEmailExistence){
      throw new HttpException('The user already exists', HttpStatus.CONFLICT)
    }

    const securePass = await hashPassword(createUser.password)

    const finalUser : CreateUserDto = this.userRepository.create({...createUser, password: securePass})
    return await this.userRepository.save(finalUser)
  }

  //restore user
  async restoreUser(input_id: string ){
    const softDeletedUser = await this.userRepository.findOne({
      where: { id: input_id },
      withDeleted: true
    });

    if (!softDeletedUser) {
      throw new HttpException(`User with ID "${input_id}" not found`, HttpStatus.NOT_FOUND)
    }

    if (softDeletedUser.deleted_at === null) {
      return { message: "This user is not deleted" };
    }

    const restoredUser = await this.userRepository.recover(softDeletedUser);
    return {
      message: "User restored successfully",
      user: restoredUser
    };
  }

  async get_users() {
    return await this.userRepository.find({ relations: {role: true, comments_user: true, review: true}})
  }

  async findOne(input_id: string) {
    return await this.userRepository.findOne({where: {id : input_id}, relations: {review: true, comments_user: true}})
  }

  //fun for the login
  async findOneByEmail(email: string){
    return await this.userRepository.findOneBy({email})
  }

  async update(input_id: string, update_data: UpdateUserDto) {
    await this.userRepository.update({id: input_id}, update_data)
    return {
      message: "the update was ok"
    }
  }

  async remove(input_id: string) {
    const to_delete = await this.userRepository.findOne({where: {id: input_id}})
    return await this.userRepository.softRemove(to_delete)
  }
}
