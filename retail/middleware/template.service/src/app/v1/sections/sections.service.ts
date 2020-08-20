import { groupBy } from 'lodash';
import { Injectable } from '@nestjs/common';
import { SectionRepository } from '@core/repository/section.repository';

@Injectable()
export class SectionsService {
  constructor(private sectionDB: SectionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.sectionDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.sectionDB.findOne({ id: id }, keys);
  }
  async findByIds(ids: readonly string[], keys?: string[]): Promise<any> {
    return await this.sectionDB.findByIds(ids, keys);
  }

  async findByIdsSorted(ids: readonly string[], keys?: string[]): Promise<any> {
    return await this.sectionDB.findByIds(ids, keys, true);
  }

  async findByTemplateId(
    template_ids: readonly string[],
    keys?: string[],
  ): Promise<any> {
    const sections = await this.sectionDB.findByTemplateId(template_ids, keys);
    // Grouping the Records using the Master table ID,
    // Then Converting the Groupby Dictionary into Array to make it compatible with Dataloader
    return template_ids.map(
      template_id => groupBy(sections, 'template_id')[template_id],
    );
  }
}
