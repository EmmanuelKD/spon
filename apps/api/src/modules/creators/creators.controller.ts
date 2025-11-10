import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Creators')
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create creator profile' })
  @ApiResponse({ status: 201, description: 'Creator profile created successfully' })
  async create(@CurrentUser() user: any, @Body() createCreatorDto: CreateCreatorDto) {
    return this.creatorsService.create(user.id, createCreatorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all creators' })
  @ApiResponse({ status: 200, description: 'List of creators' })
  async findAll(@Query() filters: any) {
    return this.creatorsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get creator by ID' })
  @ApiResponse({ status: 200, description: 'Creator found' })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  async findOne(@Param('id') id: string) {
    return this.creatorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update creator profile' })
  @ApiResponse({ status: 200, description: 'Creator updated successfully' })
  async update(@Param('id') id: string, @Body() updateCreatorDto: UpdateCreatorDto) {
    return this.creatorsService.update(id, updateCreatorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete creator profile' })
  @ApiResponse({ status: 200, description: 'Creator deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.creatorsService.remove(id);
  }
}
