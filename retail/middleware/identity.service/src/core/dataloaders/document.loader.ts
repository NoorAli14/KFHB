import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { SessionReferenceRepository } from '@rubix/core/repository/';
import { Document } from '@rubix/app/v1/documents/document.model';
import { loaderSerializer, DOCUMENT_TYPES } from '@rubix/common';
import { Doc } from 'prettier';

@Injectable()
export class DocumentDataLoader {
  constructor(private readonly sessionRefDB: SessionReferenceRepository) {}

  async recentDocumentByType(
    sessionIDs: string[] | any,
  ): Promise<ArrayLike<Document | Error>> {
    console.log(`Session IDs: ${sessionIDs}`);
    const result: Document[] = await this.sessionRefDB.recentDocumentByType(
      sessionIDs,
      [
        DOCUMENT_TYPES.PASSPORT,
        DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
        DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
      ],
    );

    return loaderSerializer(result, sessionIDs, 'session_id');
  }
}
@Injectable()
export class DocumentLoader implements NestDataLoader<string, Document> {
  constructor(private readonly loader: DocumentDataLoader) {}

  generateDataLoader(): DataLoader<string, Document> {
    return new DataLoader<string, Document>(sessionIDs =>
      this.loader.recentDocumentByType(sessionIDs),
    );
  }
}
