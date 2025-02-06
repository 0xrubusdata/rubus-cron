import { Injectable } from '@nestjs/common';
import { ContentMetadataRepository } from '../repository/contentMetadata.repository';
import { ContentMetadata } from '../entities/contentMetadata.entity';

@Injectable()
export class ContentMetadataService {
  constructor(private readonly metadataRepository: ContentMetadataRepository) {}

  async getMetadataForSource(source: string): Promise<ContentMetadata[]> {
    return this.metadataRepository.getMetadataForSource(source);
  }
}
