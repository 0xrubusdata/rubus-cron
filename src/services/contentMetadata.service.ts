import { Injectable } from '@nestjs/common';
import { MetadataRepository } from '../repository/metadataRepository';
import { ContentMetadata } from '../entities/contentMetadata.entity';

@Injectable()
export class ContentMetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  async getMetadataForSource(source: string): Promise<ContentMetadata[]> {
    return this.metadataRepository.getBySource(source);
  }
}
