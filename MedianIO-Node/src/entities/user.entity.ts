import crypto from 'crypto';
import { Entity, Column, Index, BeforeInsert, OneToMany,JoinColumn,Unique } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import { UserEducation } from './user_education.entity'; 
import { UserEmployment } from './user_employment.entity';
import { AppUsage } from './app_usage.entity';
import { AppUsageMeta } from './app_usage_meta.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Like } from './likes.entity';
import { Share } from './shares.entity';
export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
@Unique(['email'])
export class User extends Model {
 

  @Column()
  firstname: string;

  @Column({
    nullable: true,
  })
  lastname: string;

  @Column({
    nullable: true,
  })
  mobile: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  nativelanguage: string;

  @Column({
    nullable: true,
  })
  professiontype: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @Column({
    default: false,
  })
  is_deleted: boolean;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => UserEducation, (education) => education.user)
  @JoinColumn({ name: 'user_id' }) 
  educations: UserEducation[]; 

  @OneToMany(() => AppUsage, (appUsage) => appUsage.user)
  @JoinColumn({ name: 'user_id' })  
  appusages: AppUsage[];

  @OneToMany(() => AppUsageMeta, (appUsageMeta) => appUsageMeta.appUsage)
  @JoinColumn({ name: 'appusage_id' }) 
  appusagemeta: AppUsageMeta[];

  @OneToMany(() => UserEmployment, (employment) => employment.user)
  @JoinColumn({ name: 'user_id' }) 
  employments: UserEmployment[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // Add a one-to-many relation for likes
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  // Add a one-to-many relation for shares
  @OneToMany(() => Share, (share) => share.user)
  shares: Share[];
  @Index('verificationCode_index')
  @Column({
    type: 'text',
    nullable: true,
  })
  verificationCode!: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static createVerificationCode() {
    const verificationCode = crypto.randomBytes(32).toString('hex');

    const hashedVerificationCode = crypto
      .createHash('sha256')
      .update(verificationCode)
      .digest('hex');

    return { verificationCode, hashedVerificationCode };
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      verificationCode: undefined,
    };
  }
}
