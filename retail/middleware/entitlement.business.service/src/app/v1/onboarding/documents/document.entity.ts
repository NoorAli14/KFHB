export class Document {
  id?: string;

  name?: string;

  session_id: string;

  tenant_id: string;

  document_type_id?: string;

  attachable_id?: string;

  processed_data?: string;

  status?: string;

  created_by: string;

  created_on?: Date;

  updated_by: string;

  updated_on?: Date;

  deleted_by: string;

  deleted_on?: Date;
}
