import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "@feature/entitlement/models/user.model";
import { NATIONALITY_LIST, GENDER_LIST, MESSAGES } from "@shared/constants/app.constants";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfigService } from "@fuse/services/config.service";
import { BaseComponent } from "@shared/components/base/base.component";
import { snakeToCamelObject, camelToSnakeCase } from '@shared/helpers/global.helper';
import { ValidatorService } from '@core/services/validator-service/validator.service';

@Component({
    selector: "app-invitation",
    templateUrl: "./invitation.component.html",
    styleUrls: ["./invitation.component.scss"],
})
export class InvitationComponent extends BaseComponent implements OnInit {
    userForm: FormGroup;

    response: User;
    nationalityList: any[] = NATIONALITY_LIST;
    genderList: any[] = GENDER_LIST;
    token:string;
    constructor(
        private _authService: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        super();
        this.token= this.activatedRoute.snapshot.paramMap.get("token");

        this.getData( this.token);
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
        this.userForm = new FormGroup({
            id: new FormControl(),
            firstName: new FormControl('',[Validators.required]),
            middleName: new FormControl(),
            lastName: new FormControl('',[Validators.required]),
            contactNo: new FormControl('',[Validators.required,ValidatorService.numbersOnly]),
            gender: new FormControl('',[Validators.required]),
            status: new FormControl('',[Validators.required]),
            email: new FormControl('',[Validators.email]),
            dateOfBirth: new FormControl('',[Validators.required]),
            nationalityId: new FormControl('',[Validators.required]),
            password: new FormControl('',Validators.required),
            confirmPassword: new FormControl("", [
              Validators.required,
              this.confirmPasswordValidator.bind(this),
          ]),
        });
        this.userForm.get('email').disable()
    }
    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
      if (
          this.userForm &&
          control.value !== this.userForm.controls.password.value
      ) {
          return { passwordNotMatch: true };
      }
      return null;
  }
    onSubmit() {
        let model = { ...this.userForm.value };
        model.dateOfBirth = new Date(model.dateOfBirth).toLocaleDateString();
        model= camelToSnakeCase(model);
        this._authService.updateInvitation(model, this.token).subscribe(
          (response) => {
            this.errorType = "success";
            this.responseMessage = MESSAGES.UPDATED('Your Profile');
            setTimeout(() => {
                this.router.navigateByUrl('/auth/login');
            }, 1000);
          },
          (response=>super.onError(response))
      );
    }
    getData(token) {
        this._authService.getUserByToken(token).subscribe(
            (response) => {
                const user= snakeToCamelObject(response);
                this.userForm.patchValue(user)
            },
            (response=>super.onError(response))
        );
    }
}
