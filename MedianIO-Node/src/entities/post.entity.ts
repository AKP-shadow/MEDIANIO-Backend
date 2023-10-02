import { Column, Entity, JoinColumn, ManyToOne ,OneToMany} from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './likes.entity';
import { Share } from './shares.entity';

@Entity('posts')
export class Post extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @Column({
    default: 'default-post.png',
  })
  image: string;
  
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  // Add a one-to-many relation for likes
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  // Add a one-to-many relation for shares
  @OneToMany(() => Share, (share) => share.post)
  shares: Share[];
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user!: User;
}
