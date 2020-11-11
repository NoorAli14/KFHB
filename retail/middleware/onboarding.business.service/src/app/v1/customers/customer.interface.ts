export interface CreateCustomerInput {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email: string;
  contact_no: string;
  device_id: string;
  platform: string;
  fcm_token_id: string;
  last_step?: string;
}
