import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity'; // Import the User entity

@Entity('user_employment')
export class UserEmployment extends Model {
  
  @Column({ name: 'user_id', nullable: false })  
  userId: number; 

  @ManyToOne(() => User, user => user.employments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  jobtitle: string;

  @Column({ nullable: true })
  employmenttype: string;

  @Column({ nullable: true })
  startyear: number;
  @Column({ nullable: true })
  location: string;
  
  @Column({ nullable: true })
  endyear: number;

  @Column({ nullable: true })
  organization: string;
}
