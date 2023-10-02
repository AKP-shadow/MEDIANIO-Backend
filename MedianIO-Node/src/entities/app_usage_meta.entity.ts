import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppUsage } from './app_usage.entity'; // Import the AppUsage entity
import Model from './model.entity';

@Entity('appusagemeta')
export class AppUsageMeta extends Model {
 

  @ManyToOne(() => AppUsage, appUsage => appUsage.appUsageMeta)
  @JoinColumn({ name: 'appusage_id' })
  appUsage: AppUsage;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  course: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  jobtitle: string;

  @Column({ nullable: true })
  domain: string;

  @Column({nullable:true})
  others:string;


  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;
}
