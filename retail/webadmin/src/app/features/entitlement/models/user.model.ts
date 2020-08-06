import { BaseModel } from "@shared/models/base.model";
import { Role } from "./role.model";

export class User extends BaseModel {
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    contactNo: string;
    dateOfBirth: string;
    nationalityId: string;
    email: string;
    roles: Array<Role> = [];
    gender: string;
}
