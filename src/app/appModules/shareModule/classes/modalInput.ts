export class modalInput{
    modalId:string;
    title:string;
    message:string;
    error:boolean;

    constructor(id,_title,messa,_err=false)
    {
        this.modalId = id;
        this.title = _title;
        this.message = messa;
        this.error = _err;

    }

    public static readonly saveTitleSuccess:string = "DATOS GUARDADOS CORRECTAMENTE";

    public static readonly saveMessageDetail:string = "Los datos han sido guardados satisfactoriamente"



    public static readonly saveTitleError:string = "ERROR AL GUARDAR LOS DATOS";

    public static readonly getDataTitleSuccess:string = "DATOS OBTENIDOS";

    public static readonly getDataTitleNoData:string = "NO HAY DATOS";


    public static readonly getDataTitleError:string = "ERROR AL OBTENER LOS DATOS";

}