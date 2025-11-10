import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @ApiProperty({ enum: ['creator', 'brand', 'admin'] })
  @Column({ type: 'varchar' })
  role: 'creator' | 'brand' | 'admin';

  @ApiProperty({ enum: ['active', 'suspended', 'deleted'] })
  @Column({ default: 'active' })
  status: 'active' | 'suspended' | 'deleted';

  @ApiProperty()
  @Column({ default: false })
  email_verified: boolean;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty()
  @Column({ default: false })
  phone_verified: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  last_login?: Date;
}
