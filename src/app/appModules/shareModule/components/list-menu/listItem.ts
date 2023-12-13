export class lisItem{
   
    name:string;
    selected:boolean = false;
    data:any;
    id:number;

    constructor(_name:string,_id:number, _selected:boolean = false){
        this.name = _name;
        this.selected = _selected;
        this.id =_id;
        
    }
}