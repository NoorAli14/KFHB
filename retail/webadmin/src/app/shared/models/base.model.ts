export class BaseModel {
    id: string;
    status: string;

    createdOn?: Date = new Date();
    updatedOn?: Date = new Date();
    createdBy?: string;
    updatedBy?: string;
}


