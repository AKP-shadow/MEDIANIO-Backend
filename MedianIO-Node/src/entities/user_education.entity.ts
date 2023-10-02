import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; // Import the User entity
import Model from './model.entity';

@Entity('user_education')
export class UserEducation extends Model{
 

  @Column({ name: 'user_id', nullable: false })  
  userId: number; 

  @ManyToOne(() => User, user => user.educations)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })  
  user: User;

  @Column({ nullable: true })
  schoolname: string;

  @Column({ nullable: true })
  startyear: number;
  @Column({ nullable: true })
  location: string;
  
  @Column({ nullable: true })
  endyear: number;

  @Column({ nullable: true })
  Branch: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;
}
