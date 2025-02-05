import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async query(query: string, params?: any[]) {
    return this.dataSource.query(query, params);
  }
}
