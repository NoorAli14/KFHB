export interface ITemplateResponse {
  template_id: string;
  user_id: string;
  results: Record<string, unknown>;
  remarks: string;
}
