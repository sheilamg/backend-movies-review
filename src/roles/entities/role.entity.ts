import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class Role{
    //incrementar con numero
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @DeleteDateColumn()
    deleted_at?: Date;

    @OneToMany(() => User, (user) => user.role)
    user: User;
}
