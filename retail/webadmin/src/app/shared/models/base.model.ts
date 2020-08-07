export class BaseModel {
    id: string;
    status: string;

    created_on?: string;
    created_by?: string;
    updated_on?: string;
    updated_by?: string;
}

export class StatusModel {
    id: string;
    name: string;
}
