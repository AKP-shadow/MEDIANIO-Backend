import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import Model from './model.entity';

@Entity('shares')
export class Share extends Model {


  @ManyToOne(() => User, user => user.shares)
  user: User;

  @ManyToOne(() => Post, post => post.shares)
  post: Post;
}
