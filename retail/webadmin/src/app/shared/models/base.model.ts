export class BaseModel {
    id: string;
    status: string;

    created_on?: Date=new Date();
    updated_on?:  Date=new Date();;
    created_by?: string;
    updated_by?: string;
}


