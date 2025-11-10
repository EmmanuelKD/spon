import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { Creator } from './entities/creator.entity';
import { SocialMediaAccount } from './entities/social-media-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creator, SocialMediaAccount])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService],
})
export class CreatorsModule {}
