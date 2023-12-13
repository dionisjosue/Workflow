import { BaseEntity } from "@share/classes/BaseEntity";
import { apiConfiguration } from "src/app/appModules/apiModule/components/createApiConfig/create-api-config/apiConfiguration";

export class AuthenticationConfig extends BaseEntity<number>{

    authType:AuthenticationType;
    userName?:string;
    password?:string;
    key?:string;
    apiKeyValue?:string;
    apiConfigurations:Array<apiConfiguration>;
    isValid?:boolean;

}

enum AuthenticationType{
    NOAUTH,
    JWT,
    BASICAUTH,
    APIKEY
}
  