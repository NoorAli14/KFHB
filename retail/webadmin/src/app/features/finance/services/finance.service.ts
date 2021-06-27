import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { URI } from '@shared/constants/app.constants';
import { RetailNetworkService } from '@shared/services/network/retail-network.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {

    constructor(private _networkService: RetailNetworkService) { }
    getApplications(model): Observable<any> {
        // return this._networkService.post(environment.API_BASE_URL, `${URI.FINANCE_APPLICATIONS}`,model);
        return of({
            "status": 200,
            "message": "Request Success",
            "data": [
                {
                    "id": "5fc7d0f3-0336-4866-b4b0-b4ad29c64620",
                    "cpr": "640124215      ",
                    "full_name": "MASHAEL ALI MOHAMEDALHASHEMI",
                    "rim_no": "139291",
                    "financing_amount": 0,
                    "rate": 0,
                    "tenor": 0,
                    "created_on": "2021-06-24T13:40:35.116Z",
                    "is_completed": true,
                    "is_rejected": false,
                    "is_approved": false,
                    "status": "Review",
                    "finance_product_id": "1",
                    "application_type": "Real Estate",
                    "updated_by": null,
                    "is_overdue": true,
                    "admin_update_date": null,
                    "agreed_time": "2021-01-07T00:00:00.000Z",
                    "is_executed": true,
                    "final_approved": true
                },
                {
                    "id": "9960cebd-466c-4d7b-a7ee-e7731cc4a30d",
                    "cpr": "640124215      ",
                    "full_name": "MASHAEL ALI MOHAMEDALHASHEMI",
                    "rim_no": "139291",
                    "financing_amount": 0,
                    "rate": 0,
                    "tenor": 0,
                    "created_on": "2021-06-24T14:07:46.486Z",
                    "is_completed": true,
                    "is_rejected": false,
                    "is_approved": false,
                    "status": "Review",
                    "finance_product_id": "1",
                    "application_type": "Real Estate",
                    "updated_by": null,
                    "is_overdue": true,
                    "admin_update_date": null,
                    "agreed_time": "2021-01-07T00:00:00.000Z",
                    "is_executed": true,
                    "final_approved": true
                }
            ]
        })
    }
    getApplicationsById(queryParams): Observable<any> {
        // return this._networkService.getAll(`${URI.ROLE}?${queryParams}`);
        return of({
            "status": 200,
            "message": "Request Success",
            "data": {
                "other_comments": null,
                "tenor": 0,
                "id": "38cc9b92-ec52-45e5-8511-3a0507c70f13",
                "total_loan_settlement": 0,
                "account_settlement": "",
                "score": "//",
                "installment_amount": 0,
                "basic_income": 20,
                "employer_grade": "C",
                "dob": "//",
                "salary_account": "602000312964",
                "salary_slip": "",
                "fixed_deduction": 0,
                "is_kfh_salary": true,
                "id_no": "//",
                "grace_period": "2021-01-07T00:00:00.000Z",
                "monthly_income": null,
                "employer": "ABUDAWOOD ALSAFFAR COMPANY W.L.L",
                "other_income": 0,
                "other_deduction": 0,
                "business_income": 0,
                "purpose": "Education",
                "nat": "//",
                "apr": "0",
                "financing_amount": 0,
                "gen": "//",
                "allowance": 20,
                "rental_income": 0,
                "reason": null,
                "cash_in_hand": 0,
                "appliactionLiabilities": [
                    {
                        "remaining_tenor": "31/03/2022",
                        "ignorable": false,
                        "c_status": "Normal",
                        "open_date": "03/03/2016",
                        "account_status": "Normal",
                        "loan_duration": "24",
                        "h_status": "Normal",
                        "loan_amount": 5000,
                        "name": "Hell",
                        "worst_pay": 0,
                        "number_of_account_holder": "1",
                        "number_of_payment": "0",
                        "maturity_date": "31/03/2022",
                        "subscriber_name": "Kuwait Finance House",
                        "account_position": "Open",
                        "currency_code": "BD",
                        "first_missed_payment_date": "",
                        "is_selected": false,
                        "last_missed_payment_date": "",
                        "outstanding_amount": 1754,
                        "installment": 250,
                        "overdue_amount": "0",
                        "payment_method": "Cash",
                        "payment_frequency": "Monthly"
                    },
                    {
                        "remaining_tenor": "31/05/2022",
                        "ignorable": false,
                        "c_status": "Normal",
                        "open_date": "08/05/2018",
                        "account_status": "Normal",
                        "loan_duration": "36",
                        "h_status": "Normal",
                        "loan_amount": 300,
                        "name": "Hell4",
                        "worst_pay": 0,
                        "number_of_account_holder": "1",
                        "number_of_payment": "0",
                        "maturity_date": "31/05/2022",
                        "subscriber_name": "Kuwait Finance House",
                        "account_position": "Close",
                        "currency_code": "BD",
                        "first_missed_payment_date": "",
                        "is_selected": false,
                        "last_missed_payment_date": "",
                        "outstanding_amount": 0,
                        "installment": 0,
                        "overdue_amount": "0",
                        "payment_method": "Cash",
                        "payment_frequency": "Monthly"
                    },
                    {
                        "remaining_tenor": "28/02/2021",
                        "ignorable": false,
                        "c_status": "Normal",
                        "open_date": "25/02/2015",
                        "account_status": "Normal",
                        "loan_duration": "24",
                        "h_status": "Normal",
                        "loan_amount": 1000,
                        "name": "Hell3",
                        "worst_pay": 0,
                        "number_of_account_holder": "1",
                        "number_of_payment": "0",
                        "maturity_date": "28/02/2021",
                        "subscriber_name": "Kuwait Finance House",
                        "account_position": null,
                        "currency_code": "BD",
                        "first_missed_payment_date": "",
                        "is_selected": false,
                        "last_missed_payment_date": "",
                        "outstanding_amount": 0,
                        "installment": 50,
                        "overdue_amount": "0",
                        "payment_method": "Cash",
                        "payment_frequency": "Monthly"
                    },
                    {
                        "remaining_tenor": "28/07/2022",
                        "ignorable": false,
                        "c_status": "Normal",
                        "open_date": "24/01/2018",
                        "account_status": "Normal",
                        "loan_duration": "48",
                        "h_status": "Normal",
                        "loan_amount": 4948,
                        "name": "Hell",
                        "worst_pay": 0,
                        "number_of_account_holder": "2",
                        "number_of_payment": "0",
                        "maturity_date": "28/07/2022",
                        "subscriber_name": "Kuwait Finance House",
                        "account_position": "Open",
                        "currency_code": "BD",
                        "first_missed_payment_date": "",
                        "is_selected": false,
                        "last_missed_payment_date": "",
                        "outstanding_amount": 2373,
                        "installment": 103,
                        "overdue_amount": "0",
                        "payment_method": "Standing Order",
                        "payment_frequency": "Monthly"
                    },
                    {
                        "remaining_tenor": "28/02/2021",
                        "ignorable": false,
                        "c_status": "Normal",
                        "open_date": "25/02/2015",
                        "account_status": "Normal",
                        "loan_duration": "24",
                        "h_status": "Normal",
                        "loan_amount": 1000,
                        "name": "Hell5",
                        "worst_pay": 0,
                        "number_of_account_holder": "1",
                        "number_of_payment": "0",
                        "maturity_date": "28/02/2021",
                        "subscriber_name": "Kuwait Finance House",
                        "account_position": "Close",
                        "currency_code": "BD",
                        "first_missed_payment_date": "",
                        "is_selected": false,
                        "last_missed_payment_date": "",
                        "outstanding_amount": 0,
                        "installment": 50,
                        "overdue_amount": "0",
                        "payment_method": "Cash",
                        "payment_frequency": "Monthly"
                    }
                ],
                "documentList": [
                    {
                        "id": 38,
                        "document_label": "SalarySlip1",
                        "document_image": "iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
                    },
                    {
                        "id": 41,
                        "document_label": "Cnic Front",
                        "document_image": "iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
                    },
                    {
                        "id": 42,
                        "document_label": "Cnic Back",
                        "document_image": "iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
                    },
                    {
                        "id": 43,
                        "document_label": "Settlement Amount",
                        "document_image": "iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
                    }
                ]
            },

        })
    }

    getDocumentById(appId, docId): Observable<any> {
        // return this._networkService.getAll(`${URI.ROLE}?${queryParams}`);
        return of({
            "status": 200,
            "message": "Request Success",
            "data": [{
                "id": 38,
                "document_label": "SalarySlip1",
                "document_image": "iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC"
            },]
        })
    }


}
