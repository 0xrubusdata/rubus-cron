import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentMetadata } from '../entities/contentMetadata.entity';

@Injectable()
export class ContentMetadataRepository {
  constructor(
    @InjectRepository(ContentMetadata)
    private readonly repository: Repository<ContentMetadata>,
  ) {}

  async getMetadataForSource(source: string): Promise<ContentMetadata[]> {
    return await this.repository.find({ where: { source } });
  }
}
