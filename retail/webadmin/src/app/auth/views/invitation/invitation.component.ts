import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '@feature/entitlement/models/user.model';
import {  GENDER_LIST } from '@shared/constants/app.constants';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { BaseComponent } from '@shared/components/base/base.component';
import {
    snakeToCamelObject,
    camelToSnakeCase, getName, cloneDeep
} from '@shared/helpers/global.helper';
import { ValidatorService } from '@shared/services/validator-service/validator.service';
import { fuseAnimations } from '@fuse/animations';
import {  takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';
import { REGEX } from '@config/index';

@Component({
    selector: 'app-invitation',
    templateUrl: './invitation.component.html',
    styleUrls: ['./invitation.component.scss'],
    animations: fuseAnimations,
})
export class InvitationComponent extends BaseComponent implements OnInit {
    invitationForm: FormGroup;
    myControl = new FormControl();
    response: User;
    nationalityList: any[] = [];
    filteredNationalities: any[] = [];
    genderList: any[] = GENDER_LIST;
    token: string;
    constructor(
        private _authService: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        injector: Injector
    ) {
        super(injector);
        this.token = this.activatedRoute.snapshot.paramMap.get('token');

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    
    }
 
    ngOnInit(): void {
        this.invitationForm = new FormGroup({
            id: new FormControl(),
            firstName: new FormControl('', [Validators.required]),
            middleName: new FormControl(),
            lastName: new FormControl('', [Validators.required]),
            contactNo: new FormControl('', [
                Validators.required,
                ValidatorService.numbersOnly,
            ]),
            gender: new FormControl('', [Validators.required]),
            email: new FormControl({ value: '', disabled: true }),
            dateOfBirth: new FormControl('', [Validators.required]),
            nationalityId: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.pattern(REGEX.PASSWORD)]),
            confirmPassword: new FormControl('', [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
        this.getUserByToken(this.token);
        this.invitationForm.get('nationalityId').valueChanges.subscribe((value => {
            this.filteredNationalities =  this._mapperService.filterData(this.nationalityList, 'nationality', value);
          }));
    }
    displayFn = (id: string): string => {
        return getName(id, 'nationality', cloneDeep(this.nationalityList));
    }
    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
        if (
            this.invitationForm &&
            control.value !== this.invitationForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit = (): void => {
        let model = { ...this.invitationForm.value };
        model.dateOfBirth = new Date(model.dateOfBirth).toLocaleDateString();
        model = camelToSnakeCase(model);
        this._authService
            .updateInvitation(model, this.token)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.errorType = 'success';
                    this.responseMessage = MESSAGES.INVITATION_ACCEPTED();
                    setTimeout(() => {
                        this.router.navigateByUrl('/auth/login');
                    }, 1000);
                },
                (error) => {
                    this.errorType = 'error';
                    this.responseMessage = MESSAGES.UNKNOWN();
                }
            );
    }
    getUserByToken = (token): void => {
        this._authService
            .getUserByToken(token)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    const user = snakeToCamelObject(response[0]);
                    this.invitationForm.patchValue(user);
                    this.nationalityList = response[1];
                    this.filteredNationalities = response[1];
                },
                ({ error }) => {
                    this.errorType = 'error';
                    if (error.statusCode === 404) {
                        this.errorType = 'warning';
                        this.responseMessage = MESSAGES.INVALID_INVITATION();
                    } else {
                        this.responseMessage = MESSAGES.UNKNOWN();
                    }
                }
            );
    }
}
