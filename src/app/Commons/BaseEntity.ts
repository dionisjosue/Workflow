export class BaseEntity<T>{

    id: number;
    createdDate: Date = new Date();
    createdBy: string;
    lastModifiedDate: Date | null = null;
    active: boolean = true;

}