
import { Audit } from "src/audit/auditEntity";
import { CommentsUser } from "src/comments_users/entities/comments_user.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class User extends Audit{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    username: string

    //@Column('text')
    //email: string

    @Column('varchar', {length: 255, unique: true, nullable:false })
    email: string

    @Column('text', {nullable: false})
    password: string

    //reviews:

    @ManyToOne(() => Role, (role) => role.user, {eager: true})
    role: Role

    @OneToMany(() => Review, (review) => review.user)
    review: Review;
    
    @OneToMany(() => CommentsUser, (comments_user) => comments_user.user)
    comments_user: CommentsUser
}
