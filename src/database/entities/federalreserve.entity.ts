import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FederalReserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @Column({ type: 'text', nullable: true })
  content: string;
}
