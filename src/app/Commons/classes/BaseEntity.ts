export class BaseEntity<T>{


    constructor(){
        this.createdBy = "";
        
    }

    id: number;
    createdDate: Date = new Date();
    createdBy: string;
    lastModifiedDate: Date | null = null;
    active: boolean = true;

}