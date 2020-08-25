import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "@feature/entitlement/models/user.model";
import { NATIONALITY_LIST, GENDER_LIST, MESSAGES } from "@shared/constants/app.constants";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { FuseConfigService } from "@fuse/services/config.service";
import { BaseComponent } from "@shared/components/base/base.component";
import { snakeToCamelObject } from '@shared/helpers/global.helper';

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
    constructor(
        private _authService: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute
    ) {
        super();
        const token = this.activatedRoute.snapshot.paramMap.get("token");

        this.getData(token);
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
      this.errorType = "info";
      this.responseMessage = MESSAGES.THANKS
        this.userForm = new FormGroup({
            id: new FormControl(),
            firstName: new FormControl(),
            middleName: new FormControl(),
            lastName: new FormControl(),
            contactNo: new FormControl(),
            gender: new FormControl(),
            status: new FormControl(),
            email: new FormControl('',[Validators.email]),
            dateOfBirth: new FormControl(),
            nationalityId: new FormControl(),
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
        const model = { ...this.userForm.value };
        model.dateOfBirth = new Date(model.dateOfBirth).toLocaleDateString();
        this._authService.updateInvitation(model).subscribe(
          (response) => {
            this.errorType = "success";
            this.responseMessage = MESSAGES.UPDATED('Your Profile');
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
