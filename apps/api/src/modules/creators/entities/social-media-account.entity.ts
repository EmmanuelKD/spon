import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Creator } from './creator.entity';

@Entity('social_media_accounts')
export class SocialMediaAccount {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  creator_id: string;

  @ManyToOne(() => Creator, (creator) => creator.social_accounts)
  @JoinColumn({ name: 'creator_id' })
  creator: Creator;

  @ApiProperty({ enum: ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok'] })
  @Column()
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok';

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  profile_url: string;

  @ApiProperty()
  @Column({ default: 0 })
  followers_count: number;

  @ApiProperty()
  @Column({ default: 0 })
  following_count: number;

  @ApiProperty()
  @Column({ default: 0 })
  posts_count: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  avg_likes: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  avg_comments: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  avg_shares: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  engagement_rate: number;

  @ApiProperty()
  @Column({ default: false })
  verified: boolean;

  @ApiProperty()
  @Column({ default: false })
  verified_by_us: boolean;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  access_token?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  refresh_token?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  token_expires_at?: Date;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  last_synced_at?: Date;

  @ApiProperty()
  @Column({ default: 'active' })
  sync_status: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
