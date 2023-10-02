import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';

@Entity('profile')
export class Profile extends Model {
  @Column()
  profilename: string;

  @Column()
  school: string;
  }