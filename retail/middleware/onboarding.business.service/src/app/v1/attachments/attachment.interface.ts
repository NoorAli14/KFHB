export interface FaceUploadingInput {
  file: string;
}

export interface DocumentUploadingInput {
  //   customer_id: string;
  file: string;
  type: string;
}

export interface IDocumentProcess {
  type: string;
}
