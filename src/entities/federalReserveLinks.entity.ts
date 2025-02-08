import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { FederalReserve } from './federalReserve.entity';

@Entity()
export class FederalReserveLinks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ default: false })
  processed: boolean;

  // 🔹 Relation OneToOne avec une FK explicite vers FederalReserve
  @OneToOne(() => FederalReserve, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'federalReserveId' }) // 📌 Crée la FK en BDD !
  federalReserve: FederalReserve;
}
