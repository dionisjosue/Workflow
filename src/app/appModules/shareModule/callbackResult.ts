import { Alert } from "./classes/Alert";

export class callbackResult{
    data:any;
    alert:Alert;
    success:boolean;

    constructor(_sucess){
        this.success = _sucess;
    }
    
}