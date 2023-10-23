
export class jsonProps{
    name:string;
    children:jsonProps[];
    idx:number;

    constructor(_nam:string,_idx:number){
        this.name = _nam;
        this.idx = _idx;
        this.children = new Array<jsonProps>();
    }
}