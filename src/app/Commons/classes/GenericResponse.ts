export class GenericResponse<T>{

    data:T;
    items:Array<T>;
    success:boolean;
    message:string;
    code:number;
}