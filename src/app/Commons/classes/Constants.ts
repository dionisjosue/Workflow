import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants
 {

    
    public static readonly CORE_DOMAIN_LOCAL: string = 'http://localhost:5112/api/'; 
    private static readonly CORE_DOMAIN_QA: string = 'http://10.3.10.41:8062/'; 
    private static readonly CORE_DOMAIN_PROD: string = 'http://10.3.10.41:8062/'; 

    public static readonly GET_FLOW:string="Flow/Flows";
    private static readonly CREATE_FLOW:string="Flow/CreateFlow";
    private static readonly EDIT_FLOW:string="Flow/EditFlow";
    private static readonly REMOVE_FLOW:string="Flow/RemoveFlow";


    public static readonly GET_STEP:string=   "Step/Steps";
    public static readonly CREATE_STEP:string= "Step/CreateStep";
    public static readonly EDIT_STEP:string= "Step/EditStep";
    

    public static readonly GET_AREA:string= "Area/GetAreas";
    public static readonly CREATE_AREA:string= "Area/CreateArea";
    public static readonly EDIT_AREA:string= "Area/EditArea";

    public static readonly GET_PRODUCT:string= "Product/Products";
    public static readonly CREATE_PRODUCT:string= "Product/CreateProducts";
    public static readonly EDIT_PRODUCT:string= "Product/EditProducts";

    public static readonly GET_MODULE:string= "Module/Module";
    public static readonly CREATE_MODULE:string= "Module/CreateModules";
    public static readonly EDIT_MODULE:string= "Module/EditModules";

    public static readonly GET_FIELD:string= "Field/GetFields";
    public static readonly CREATE_FIELD:string= "Field/CreateFields";
    public static readonly EDIT_FIELD:string= "Field/EditFields";

    public static readonly GET_FIELDTYPE:string= "FieldType/FieldsType";
    public static readonly CREATE_FIELDTYPE:string= "FieldType/CreateFieldsType";
    public static readonly EDIT_FIELDTYPE:string= "FieldType/EditFieldsType";

    
    public static readonly GET_FIELDOPTION:string= "FieldOption/FieldOptions";
    public static readonly CREATE_FIELDOPTION:string= "FieldOption/CreateFieldOptions";
    public static readonly EDIT_FIELDOPTION:string= "FieldOption/EditFieldOptions";

        
    public static readonly GET_FORMS:string= "Form/GetForms";
    public static readonly CREATE_FORMS:string= "Form/CreateForms";
    public static readonly EDIT_FORMS:string= "Form/EditForms";

    public static readonly GET_FORMSTEP:string= "FormStep/GetFormSteps";
    public static readonly CREATE_FORMSTEP:string= "FormStep/CreateFormSteps";
    public static readonly EDIT_FORMSTEP:string= "FormStep/EditFormSteps";

    public static readonly GET_SECTION:string= "Section/GetSections";
    public static readonly CREATE_SECTION:string= "Section/CreateSections";
    public static readonly EDIT_SECTION:string= "Section/EditSections";

    
    public static readonly GET_ATTACHMENT:string= "Attachment/GetAttachments";
    public static readonly CREATE_ATTACHMENT:string= "Attachment/CreateAttachments";
    public static readonly EDIT_ATTACHMENT:string= "Attachment/EditAttachments";

    public static readonly GET_ATTACHMENTSTEP:string= "AttachmentStep/GetAttachmentSteps";
    public static readonly CREATE_ATTACHMENTSTEP:string= "AttachmentStep/CreateAttachmentSteps";
    public static readonly EDIT_ATTACHMENTSTEP:string= "AttachmentStep/EditAttachmentStep";

    public static readonly GET_FLOWSTEP:string= "FlowStep/GetFlowSteps";
    public static readonly CREATE_FLOWTSTEP:string= "FlowStep/CreateFlowSteps";
    public static readonly EDIT_FLOWSTEP:string= "FlowStep/EditFlowSteps";

    public static readonly GET_CONDITIONALS:string= "Conditional/GetConditionals";
    public static readonly CREATE_CONDITIONALS:string= "Conditional/CreateConditionals";
    public static readonly EDIT_CONDITIONALS:string= "Conditional/EditConditionals";

    public static readonly GET_DOCUMENTS:string= "Document/GetDocuments";
    public static readonly CREATE_DOCUMENTS:string= "Document/CreateDocuments";
    public static readonly EDIT_DOCUMENTS:string= "Document/EditDocuments";


    public static readonly GET_APICONFIG:string= "ApiConfig/GetApiConditionals";
    public static readonly CREATE_APICONFIG:string= "ApiConfig/CreateApiConfigurations";
    public static readonly EDIT_APICONFIG:string= "ApiConfig/EditApiConfigurations";


    public static readonly GET_APICONDITIONAL:string= "ApiConditional/GetApiConditionals";
    public static readonly CREATE_APICONDITIONAL:string= "ApiConditional/CreateApiConditionals";
    public static readonly EDIT_APICONDITIONAL:string= "ApiConditional/EditApiConditionals";


    

    static get GetFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FLOW;
    }
    static get CreateFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FLOW;
    }
    static get EditFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FLOW;
    }
    static get RemoveFlowEP(){
        return this.CORE_DOMAIN_LOCAL + this.REMOVE_FLOW;
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
        return this.CORE_DOMAIN_LOCAL + this.GET_AREA;
    }
    static get CreateAreaEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_AREA;
    }
    static get EditAreaEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_AREA;
    }

    static get GetProductEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_PRODUCT;
    }
    static get CreateProductEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_PRODUCT;
    }
    static get EditProductEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_PRODUCT;
    }

    
    static get GetModuleEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_MODULE;
    }
    static get CreateModuleEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_MODULE;
    }
    static get EditModuleEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_MODULE;
    }

    static get GetFieldEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FIELD;
    }
    static get CreateFieldEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FIELD;
    }
    static get EditFieldEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FIELD;
    }

    
    static get GetFieldTypeEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FIELDTYPE;
    }
    static get CreateFieldTypeEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FIELDTYPE;
    }
    static get EditFieldTypeEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FIELDTYPE;
    }

    static get GetFieldOptionEP(){
        return this.CORE_DOMAIN_LOCAL + this.GetFieldOptionEP;
    }
    static get CreateFieldOptionEP(){
        return this.CORE_DOMAIN_LOCAL + this.CreateFieldOptionEP;
    }
    static get EditFieldOptionEP(){
        return this.CORE_DOMAIN_LOCAL + this.EditFieldOptionEP;
    }

    static get GetFormEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FORMS;
    }
    static get CreateFormEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FORMS;
    }
    static get EditFormEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FORMS;
    }

    static get GetFormStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FORMSTEP;
    }
    static get CreateFormStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FORMSTEP;
    }
    static get EditFormStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FORMSTEP;
    }

    static get GetSectionEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_SECTION;
    }
    static get CreateSectionEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_SECTION;
    }
    static get EditSectionEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_SECTION;
    }


    static get GetAttachmentEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_ATTACHMENT;
    }
    static get CreateAttachmentEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_ATTACHMENT;
    }
    static get EditAttachmentEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_ATTACHMENT;
    }


    static get GetAttachmentStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_ATTACHMENTSTEP;
    }
    static get CreateAttachmentStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_ATTACHMENTSTEP;
    }
    static get EditAttachmentStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_ATTACHMENTSTEP;
    }

    
    static get GetFlowStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_FLOWSTEP;
    }
    static get CreateFlowStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_FLOWTSTEP;
    }
    static get EditFlowStepEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_FLOWSTEP;
    }

    static get GetConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_CONDITIONALS;
    }
    static get CreateConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_CONDITIONALS;
    }
    static get EditConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_CONDITIONALS;
    }

    static get GetDocumentEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_DOCUMENTS;
    }
    static get CreateDocumentEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_DOCUMENTS;
    }
    static get EditDocumentEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_DOCUMENTS;
    }

    static get GetApiConfigEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_APICONFIG;
    }
    static get CreateApiConfigEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_APICONFIG;
    }
    static get EditApiConfigEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_APICONFIG;
    }

    static get GetApiConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.GET_APICONDITIONAL;
    }
    static get CreateApiConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.CREATE_APICONDITIONAL;
    }
    static get EditApiConditionalEP(){
        return this.CORE_DOMAIN_LOCAL + this.EDIT_APICONDITIONAL;
    }






 }