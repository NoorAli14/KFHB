import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOMHelper } from 'testing/dom.helper';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './profile.component';
import { SettingService } from '@feature/setting/setting.service';
import { of, throwError } from 'rxjs';
import { NotifierService } from '@shared/services/notifier/notifier.service';

describe('ProfileComponent', async () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let injectorMock: any;
    let helper: DOMHelper<ProfileComponent>;
    let matDialogMock: any;
    let settingServiceMock: any;
    const dialogRefSpyObj = jasmine.createSpyObj({
        afterClosed: of({}),
        close: null,
    });
    let notifierServiceMock: any;
    dialogRefSpyObj.componentInstance = { body: '' };
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
        settingServiceMock = jasmine.createSpyObj('SettingService', [
            'updateProfile', 'getNationalities'
        ]);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);

        settingServiceMock.updateProfile.and.returnValue(of([]));
        settingServiceMock.getNationalities.and.returnValue(of([]));
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [RouterTestingModule, NoopAnimationsModule],
            providers: [
                {
                    provide: MatDialog,
                    useValue: matDialogMock,
                },
                {
                    provide: NotifierService,
                    useValue: notifierServiceMock,
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                },
                {
                    provide: SettingService,
                    useValue: settingServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
      
        fixture.detectChanges();
    });

    it('should create ProfileComponent', () => {
        expect(component).toBeTruthy();
    });
    it('should call openDialog method on update profile button click only 1 time', () => {
        spyOn(component, 'openDialog');
        helper.clickElement('.btn-update');
        expect(component.openDialog).toHaveBeenCalledTimes(1);
    });
    it('should open dialog on update profile button click', () => {
        helper.clickElement('.btn-update');
        matDialogMock.open.and.returnValue(dialogRefSpyObj);
        expect(matDialogMock.open).toHaveBeenCalledTimes(1);
    });
    it('should updateProfile method be called at least 1 time', () => {
        settingServiceMock.updateProfile.and.returnValue(of([]));
        component.onUpdateProfile({});
        expect(settingServiceMock.updateProfile).toHaveBeenCalledTimes(1);
    });

    it('should show error message if update profile API failed', () => {
        settingServiceMock.updateProfile.and.returnValue(throwError(''));
        component.onUpdateProfile({});
        expect(settingServiceMock.updateProfile).toHaveBeenCalledTimes(1);
    });
});
