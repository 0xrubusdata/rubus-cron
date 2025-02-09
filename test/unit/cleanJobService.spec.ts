import { Test, TestingModule } from '@nestjs/testing';
import { CleanJobService } from '../../src/services/cleanJob.service';
import { FederalReserveDocumentsRepository } from '../../src/repository/federalReserveDocuments.repository';
import { FederalReserveLinksRepository } from '../../src/repository/federalReserveLinks.repository';

describe('CleanJobService', () => {
  let service: CleanJobService;
  let documentsRepository: Partial<FederalReserveDocumentsRepository>;
  let linksRepository: Partial<FederalReserveLinksRepository>;

  beforeEach(async () => {
    documentsRepository = {
      deleteOldUnprocessed: jest.fn().mockResolvedValue(undefined),
    };

    linksRepository = {
      deleteOldUnprocessed: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CleanJobService,
        { provide: FederalReserveDocumentsRepository, useValue: documentsRepository },
        { provide: FederalReserveLinksRepository, useValue: linksRepository },
      ],
    }).compile();

    service = module.get<CleanJobService>(CleanJobService);
  });

  it('should delete old unprocessed documents and links', async () => {
    await service.cleanOldEntries();

    expect(documentsRepository.deleteOldUnprocessed).toHaveBeenCalledWith(3);
    expect(linksRepository.deleteOldUnprocessed).toHaveBeenCalledWith(3);
  });
});
