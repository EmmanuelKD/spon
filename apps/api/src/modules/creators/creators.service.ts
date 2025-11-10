import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from './entities/creator.entity';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private creatorsRepository: Repository<Creator>,
  ) {}

  async create(userId: string, createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator = this.creatorsRepository.create({
      ...createCreatorDto,
      user_id: userId,
    });
    return this.creatorsRepository.save(creator);
  }

  async findAll(filters?: any): Promise<Creator[]> {
    const query = this.creatorsRepository.createQueryBuilder('creator');
    
    if (filters?.niche) {
      query.where('creator.primary_niche = :niche', { niche: filters.niche });
    }
    
    if (filters?.country) {
      query.andWhere('creator.country = :country', { country: filters.country });
    }
    
    if (filters?.verified !== undefined) {
      query.andWhere('creator.verified = :verified', { verified: filters.verified });
    }
    
    return query.getMany();
  }

  async findOne(id: string): Promise<Creator> {
    const creator = await this.creatorsRepository.findOne({
      where: { id },
      relations: ['social_accounts', 'user'],
    });
    
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${id} not found`);
    }
    
    return creator;
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const creator = await this.findOne(id);
    Object.assign(creator, updateCreatorDto);
    return this.creatorsRepository.save(creator);
  }

  async remove(id: string): Promise<void> {
    const creator = await this.findOne(id);
    await this.creatorsRepository.remove(creator);
  }
}
