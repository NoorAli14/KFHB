import { BaseModel } from "@shared/models/base.model";

export class InternationalTransferRequest extends BaseModel {
    id: string;
    customer_id: string;
    customer_name: string;
    from_rim_no: string;
    from_account_id: string;
    from_currency_id: string;
    from_iban: string;
    from_full_name: string;
    from_country_code: string;
    from_bank_code: string;
    amount: number;
    ex_rate: number;
    local_eq: number;
    description: string;
    system_date_time: string;
    status: string;
    beneficiary_id: string;
    to_account_id: string;
    to_currency_id: string;
    to_iban: string;
    to_full_name: string;
    to_country_code: string;
    to_bank_code: string;
    bank_charges: string;
    authorize_by: string;
    authorize_time: string;
    authorize_terminal: string;
    bank_trx_ref_no: string;
}