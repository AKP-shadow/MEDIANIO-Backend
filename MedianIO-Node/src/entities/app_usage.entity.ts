import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { User } from './user.entity'; // Import the User entity
import Model from './model.entity';
import { AppUsageMeta } from './app_usage_meta.entity';

@Entity('appusage')
export class AppUsage extends Model{
 

  @ManyToOne(() => User, user => user.appusages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => AppUsageMeta, appUsageMeta => appUsageMeta.appUsage) // Establish one-to-many relationship with AppUsageMeta
  appUsageMeta: AppUsageMeta[];

  @Column()
  appUsage: string;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;
}
