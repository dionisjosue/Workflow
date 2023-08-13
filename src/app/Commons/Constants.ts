import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants
 {
    public static readonly CORE_DOMAIN_LOCAL: string = 'https://localhost:7054/api/'; 
    private static readonly CORE_DOMAIN_QA: string = 'http://10.3.10.41:8062/'; 
    private static readonly CORE_DOMAIN_PROD: string = 'http://10.3.10.41:8062/'; 

    public static readonly GET_FLOW:string="Flow/Flows";
    private static readonly CREATE_FLOW:string="";
    private static readonly EDIT_FLOW:string="";

    public static readonly GET_STEP:string= "Step/Steps";
    public static readonly CREATE_STEP:string= "Step/CreateStep";
    public static readonly EDIT_STEP:string= "Step/EditStep";
    

    public static readonly GET_AREA:string= "Step/GetAreas";
    public static readonly CREATE_AREA:string= "Step/CreateArea";
    public static readonly EDIT_AREA:string= "Step/EditArea";


    static get GetFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FLOW;
    }
    static get CreateFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FLOW;
    }
    static get EditFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FLOW;
    }

    static get GetStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_STEP;
    } 
    static get CreateStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_STEP;
    } 
    static get EditStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_STEP;
    }

    static get GetAreaEP(){
        return this.CORE_DOMAIN_LOCAL + this.GetAreaEP;
    }
    static get CreateAreaEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_AREA;
    }
    static get EditAreaEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_AREA;
    }



 }