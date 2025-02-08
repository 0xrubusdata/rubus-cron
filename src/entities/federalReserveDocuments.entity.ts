import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FederalReserveLinks } from './federalReserveLinks.entity';

@Entity()
export class FederalReserveDocuments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ default: false })
  processed: boolean;

  @ManyToOne(() => FederalReserveLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'federalReserveLinksId' })
  federalReserveLinks: FederalReserveLinks;
}
