export class Alert{
    type:string
    message:string
    show:boolean;
    index:number;
    shwBtn:boolean;

    constructor(_type,_message,_show,_index,_shwBtn){
        this.type= _type;
        this.message = _message;
        this.show = _show;
        this.index = _index;
        this.shwBtn = _shwBtn;
    }
}