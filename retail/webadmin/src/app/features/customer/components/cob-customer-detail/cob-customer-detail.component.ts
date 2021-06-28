import { AGENT_REMARKS, CORPORATE_REMARKS_LIST, DEFAULT_IMAGE, MODULES, USER_TYPE } from "@shared/constants/app.constants";
import { b64DecodeUnicode, snakeToCamelObject } from "@shared/helpers/global.helper";
import {
  AfterContentChecked,
  Component,
  Inject,
  Injector,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "@env/environment";
import { fuseAnimations } from "@fuse/animations";
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from "@ngx-gallery/core";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@feature/customer/customer.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { takeUntil } from "rxjs/operators";
import { MESSAGES } from "@shared/constants/messages.constant";
import { WorkflowService } from "@shared/services/workflow/workflow.service";
import { WorkflowActionDto, WorkflowActionParameterDto } from "@shared/models/workflow.model";
@Component({
  selector: 'app-customer-detail',
  templateUrl: './cob-customer-detail.component.html',
  styleUrls: ['./cob-customer-detail.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class CobCustomerDetailComponent extends BaseComponent implements OnInit, AfterContentChecked {

  passportDocuments: GalleryItem[];
  passportProcessed: any;
  customer: any;
  customerReponse: any;
  companyDetail: any;
  memberDetail: any;
  remarksList = CORPORATE_REMARKS_LIST;
  remarksForm: FormGroup;
  canSubmitTask: boolean;
  constructor(
    public gallery: Gallery,
    public matDialogRef: MatDialogRef<CobCustomerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthenticationService,
    private _service: CustomerService,
    private _workflowService: WorkflowService,
    injector: Injector
  ) {
    super(injector, MODULES.CUSTOMERS);
    super.ngOnInit();
  }

  ngOnInit(): void {
    this.customerReponse = this.data[0];
    this.initData();
    this.getCustomerDetail();
    this.remarksForm = new FormGroup({
      agent_remarks: new FormControl(null,),
      agent_status: new FormControl(null, [Validators.required]),
    });
  }
  initData(): void {
    let data = this.customerReponse.templates?.map((item) => {
      return {
        ...item, results: JSON.parse(b64DecodeUnicode(item.results))
      }
    });
    data = data ? data : [];
    const passportProcessData =
      this.customerReponse.documents.length > 0
        ? this.customerReponse.documents.find(
          (x) => x.name === "PASSPORT"
        )
        : null;
    this.passportProcessed = passportProcessData
      ? JSON.parse(passportProcessData.processed_data)?.mrz
      : null;
    this.customer = snakeToCamelObject(this.customerReponse);

    const _passportDocuments = [
      { title: "Passport", type: "PASSPORT", isExtracted: false },
      { title: "Passport Face", type: "PASSPORT", isExtracted: true },
    ];

    this.passportDocuments = _passportDocuments.map((item) => {
      const url = this.previewDocumentUrl(item.type, item.isExtracted);
      return new ImageItem({ src: url, thumb: url, title: item.title });
    });


    this.basicLightboxExample(this.passportDocuments);

    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig(
      "passportDocuments",
      this.passportDocuments
    );
  }

  ngAfterContentChecked(): void {
    const el = document.querySelectorAll(".g-image-item");
    el.forEach((x) => {
      x["style"].backgroundSize = "contain";
    });
  }
  basicLightboxExample(items): void {
    this.gallery.ref().load(items);
  }

  getUrl(url): string {
    return `${environment.RETAIL_API_BASE_URL}/api/v1${url}`;
  }

  previewDocumentUrl(type, isExtracted): string {
    const tenantId = environment.TENANT_ID;
    const channelId = environment.CHANNEL_ID;
    const token = this.authService.accessToken;
    const customerId = this.customerReponse.id;

    const document = this.customerReponse.documents.find(
      (x) => x.name === type
    );
    if (!document) {
      return DEFAULT_IMAGE;
    }

    let url = `/onboarding/customers/${customerId}/documents/${document.id}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
    if (isExtracted) {
      url = `${url}&extracted-image=true`;
    }
    return this.getUrl(url);
  }

  withCustomGalleryConfig(element, images): void {
    const lightboxGalleryRef = this.gallery.ref(element);

    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    lightboxGalleryRef.load(images);
  }

  async onSubmit() {
    let model = this.remarksForm.value;
    model = {
      ...model,
      member_profile_id: this.memberDetail.member_profile_id,
      member_type_id: this.memberDetail.member_type_id
    }
    const memberResponse = await this._service.updateCorporateMember(this.memberDetail.id, model);
    if(memberResponse) {
      await this.submitRequest(this.remarksForm.controls["agent_status"].value);
      this._notifier.success('Remarks added successfully')
    }
    else {
      this._notifier.error(MESSAGES.UNKNOWN);
    }
  }
  getCustomerDetail(): void { {}
    this._service
      .getCorporateCustomerData(this.customerReponse.entity_id, this.customerReponse.entity_member_id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          console.log(response[0].data)
          this.companyDetail = response[0].data;
          this.memberDetail = response[1].member;

          this.getUserTask(this.companyDetail.id,this.memberDetail.member_profile_id);
          this.remarksForm.patchValue({
            agent_remarks: this.memberDetail.agent_remarks,
            agent_status: this.memberDetail.agent_status,
          })
        },
        (response) => super.onError(response)
      );
  }

  async getUserTask(corporate_id: string, member_profile_id: string) {
    try {
      const params = {
        varKey: "companyMember",
        varValue: member_profile_id
      }

      this.canSubmitTask = false;
      const response = await this._workflowService.GetNextTaskByUserType(USER_TYPE.AGENT, corporate_id, params);

      if (response) {
        if (response.uiRouting == "failure")  {
          this._notifier.error(MESSAGES.UNKNOWN);
        }
        else if(response.uiRouting == "agent_video_call") {
          this.canSubmitTask = true;
        }
      }
      else {
        this._notifier.error(MESSAGES.UNKNOWN);
      }
    }
    catch (error) {
      this._notifier.error(MESSAGES.UNKNOWN);
    }
  }

  async submitRequest(value: string) {  
    const actionDto: WorkflowActionDto = {
      code: this._workflowService.CurrentTask.actions.length > 0 ? this._workflowService.CurrentTask.actions[0].code : "submit",
      actionParameters: [
        {
          key: "identityVerified",
          value: value == AGENT_REMARKS.FACE_MATCHED ? "true" : "false",
          dataType: 'string'
        }
      ]
    };

    try {
      const response = await this._workflowService.SubmitTask(this.companyDetail.id, this._workflowService.CurrentTask.code, USER_TYPE.AGENT, actionDto);

      if (response) {
        if (response && response.uiRouting == "failure") {
          this._notifier.error(MESSAGES.UNKNOWN);
        }
      }
      else {
        this._notifier.error(MESSAGES.UNKNOWN);
      }
    }
    catch (error) {
      this._notifier.error(MESSAGES.UNKNOWN);
    }
  }
}
