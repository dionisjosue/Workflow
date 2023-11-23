import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { apiConfiguration } from "src/app/api-config/classes/apiConfiguration";

export class AuthenticationConfig extends BaseEntity<number>{

    authType:AuthenticationType;
    userName?:string;
    password?:string;
    key?:string;
    apiKeyValue?:string;
    apiConfigurations:Array<apiConfiguration>;

}

enum AuthenticationType{
    NOAUTH,
    JWT,
    BASICAUTH,
    APIKEY
}
  