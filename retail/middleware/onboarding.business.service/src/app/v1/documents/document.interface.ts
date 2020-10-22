export interface FaceUploadingInput {
  file: string;
  sub_type?: string;
}

export interface DocumentUploadingInput {
  //   customer_id: string;
  file: string;
  type: string;
}

export interface IDocumentProcess {
  type: string;
}
