import {
    NATIONALITY_LIST,
    STATUS_LIST,
    GENDER_LIST,
} from "@shared/constants/app.constants";
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    EventEmitter,
    Output,
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@feature/entitlement/models/user.model";
import { Role } from "@feature/entitlement/models/role.model";
import { camelToSnakeCase } from "@shared/helpers/global.helper";
import { BaseComponent } from "@shared/components/base/base.component";
import { fuseAnimations } from "@fuse/animations";
import { ValidatorService } from '@shared/services/validator-service/validator.service';

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserFormComponent extends BaseComponent implements OnInit {
    userForm: FormGroup;

    response: User;
    roles: Role[];
    permissions: any[];
    nationalityList: any[] = NATIONALITY_LIST;
    genderList: any[] = GENDER_LIST;
    statusList: any[] = STATUS_LIST;
    @Output() sendResponse: EventEmitter<User> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super();
    }
    requiredIfUpdating(predicate) {
        return (formControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return Validators.required(formControl);
            }
            return null;
        };
    }
    ngOnInit(): void {
        this._errorEmitService.currentMessage.subscribe((item) => {
            this.errorType = item.type;
            this.responseMessage = item.message;
        });
        this.permissions = this._authUserService.getPermissionsByModule("User");
        this.userForm = new FormGroup({
            id: new FormControl(this.data.user.id),
            username: new FormControl(this.data.user.username, [
                this.requiredIfUpdating(() => !this.userForm.get("id").value),
            ]),
            firstName: new FormControl(this.data.user.firstName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            middleName: new FormControl(this.data.user.middleName),
            lastName: new FormControl(this.data.user.lastName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            contactNo: new FormControl(this.data.user.contactNo, [
                ValidatorService.numbersOnly,
            ]),
            gender: new FormControl(this.data.user.gender, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            email: new FormControl(this.data.user.email, [
                Validators.required,
                Validators.email,
            ]),
            dateOfBirth: new FormControl(
                this.data.user.dateOfBirth
                    ? new Date(this.data.user.dateOfBirth)
                    : null
            ),
            nationalityId: new FormControl(this.data.user.nationalityId),
            roles: new FormControl(
                this.data.user.roles.map((x) => x.id),
                [Validators.required]
            ),
        });
        this.roles = this.data.roles;
        if (this.data.user.id) {
            this.userForm.get("email").disable();
            this.userForm.get("dateOfBirth").disable();
            this.userForm.get("nationalityId").disable();
            this.userForm.get("contactNo").disable();
        }
    }
    isExist(roles, roleId) {
        return roles.find((x) => x == roleId);
    }
    onSubmit() {
        let model = { ...this.userForm.value };
        model.roles = this.userForm.value.roles.map((item) => ({
            id: item,
        }));
        if (model.id && model.id.length > 0) {
            this.data.user.roles.forEach((item) => {
                const isExist = this.isExist(model.roles, item.id);
                if (!isExist)
                    model.roles.push({ id: item.id, _deleted: true });
            });
        }
        model = camelToSnakeCase(model);

        this.sendResponse.emit(model);
    }
}
