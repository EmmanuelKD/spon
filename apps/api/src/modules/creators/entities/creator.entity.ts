import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { SocialMediaAccount } from './social-media-account.entity';

@Entity('creators')
export class Creator {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column()
  display_name: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  avatar_url?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  banner_url?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, length: 2 })
  country?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  city?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  timezone?: string;

  @ApiProperty()
  @Column()
  primary_niche: string;

  @ApiProperty({ required: false })
  @Column('simple-array', { nullable: true })
  secondary_niches?: string[];

  @ApiProperty({ required: false })
  @Column('simple-array', { nullable: true })
  languages?: string[];

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  experience_years?: number;

  @ApiProperty()
  @Column({ default: false })
  verified: boolean;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  verification_badge?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  verification_date?: Date;

  @ApiProperty()
  @Column({ default: 0 })
  total_followers: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  avg_engagement_rate: number;

  @ApiProperty()
  @Column({ default: 0 })
  total_projects: number;

  @ApiProperty()
  @Column({ default: 0 })
  completed_projects: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  avg_rating: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_earnings: number;

  @ApiProperty()
  @Column({ default: 'free' })
  subscription_tier: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  subscription_expires_at?: Date;

  @ApiProperty()
  @Column({ default: true })
  available_for_work: boolean;

  @ApiProperty()
  @Column({ default: 24 })
  response_time_hours: number;

  @OneToMany(() => SocialMediaAccount, (account) => account.creator)
  social_accounts: SocialMediaAccount[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
