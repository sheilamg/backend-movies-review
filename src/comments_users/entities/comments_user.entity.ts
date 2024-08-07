import { Audit } from "src/audit/auditEntity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment-user')
export class CommentsUser extends Audit{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    comment: string    

    @ManyToOne(() => Review, (review) => review.comments_user, {eager: true})
    review: Review

    @ManyToOne(() => User, (user) => user.comments_user, {eager: true})
    user: User

}

//review_user