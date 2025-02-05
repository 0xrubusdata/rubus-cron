import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('content_metadata')
export class ContentMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  region: string; // "USA" ou "UE"

  @Column({ type: 'varchar', length: 50 })
  source: string; // "europarl", "eurostat", etc.

  @Column({ type: 'varchar', length: 50 })
  content_type: string; // "NEWS", "Committees", etc.

  @Column({ type: 'text' })
  content_name: string; // Nom détaillé du contenu

  @Column({ type: 'varchar', length: 255 })
  url: string; // URL du flux RSS ou API
}
