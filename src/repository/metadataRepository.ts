import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentMetadata } from '../entities/contentMetadata.entity';

@Injectable()
export class MetadataRepository {
  constructor(
    @InjectRepository(ContentMetadata)
    private readonly repository: Repository<ContentMetadata>,
  ) {}

  async getBySource(source: string): Promise<ContentMetadata[]> {
    return this.repository.find({ where: { source } });
  }
}
