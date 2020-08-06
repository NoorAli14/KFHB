import { StatusModel } from "./../../../../../shared/models/base.model";
import {
    Component,
    OnInit,
    Inject,
    ViewEncapsulation,
    Output,
    EventEmitter,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Modules } from "../../../models/modules.model";
import { fuseAnimations } from "@fuse/animations";
import { STATUS_LIST } from "@shared/constants/app.constants";

@Component({
    selector: "app-modules-form",
    templateUrl: "./modules-form.component.html",
    styleUrls: ["./modules-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ModulesFormComponent implements OnInit {
    modulesForm: FormGroup;

    modules: Modules[];
    statusList: StatusModel[] = STATUS_LIST;
    @Output() sendResponse: EventEmitter<Modules> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<ModulesFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.modulesForm = new FormGroup({
            id: new FormControl(this.data.module.id),
            name: new FormControl(this.data.module.name, [Validators.required]),
            status: new FormControl(this.data.module.status, [
                Validators.required,
            ]),
            parent_id: new FormControl(
                this.data.module.parentModule
                    ? this.data.module.parentModule.id
                    : "randid",
                [Validators.required]
            ),
            permissions: new FormControl(
                this.data.module.permissions.map((x) => x.id),
                [Validators.required]
            ),
        });
        this.modules = this.data.modules;
        this.modules = [
            ...this.modules,
            {
                id: "randid",
                name: "Root",
                status: "active",
                parent: "1",
                permissions: [],
            },
        ];
    }
    onSubmit() {
        const model = { ...this.modulesForm.value };
        model.permissions = this.modulesForm.value.permissions.map((item) => ({
            id: item,
        }));
        this.sendResponse.emit(model);
    }
}
