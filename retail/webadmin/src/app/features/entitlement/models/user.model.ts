import { BaseModel } from '@shared/model/base.model';

export class User extends BaseModel{
    username:string;
    firstName:string;
    lastName:string;
    middleName:string;
    password:string;
    contactNo:string;
    dateOfBirth:string;
    nationalityId:string;
    email:string;
    roleId:string;
    gender:string;
}