import { HttpHeaders, HttpParams } from "@angular/common/http";
import { BaseFilter } from "./BaseFilter";
import { isNumber } from "@ng-bootstrap/ng-bootstrap/util/util";
import { jsonProps } from "src/app/api-config/classes/jsonProps";

export class Utilities
{
    static setDefaultHeaders():HttpHeaders{
        var headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With,X-CSRF-Token"
        });
        return headers;
    }
    static check(field):boolean{
        if(field != 'undefined' && field != null)
            return true;
        return false;
    } 
    static setDefaultParams(filter:BaseFilter):HttpParams
    {
        var params = new HttpParams();
        if(filter == null)
            return params;

        params = Utilities.check(filter.createdBy)? params.append("CreatedBy",filter.createdBy):
        params;

        params = Utilities.check(filter.createdDate)? params.append("CreatedDate",filter.createdDate):
        params;


        params = Utilities.check(filter.currentPage)? params.append("CurrentPage",filter.currentPage):
        params;

        params;

        params = Utilities.check(filter.itemPerPage)? params.append("itemPerPage",filter.createdBy):
        params;

        params;

        params = Utilities.check(filter.lastId)? params.append("LastId",filter.lastId):
        params;

        params = Utilities.check(filter.id)? params.append("Id",filter.id):
        params;
        
        return params;
    }

    static extractComodins(htmlString: string): string[] 
    {
      let starIdx = htmlString.indexOf('<body>');
      let endIdx = htmlString.lastIndexOf('</body>');
      let str = htmlString.substring(starIdx,endIdx);
      const regex = /\[\[([^\]]+?)\]\]|\{\{([^}]+?)\}\}|\[([^\]]+?)\]|\{([^}]+?)\}/g;
     // const regex = /\[\[([^\]]+)\]\]|\{\{([^}]+)\}\}|\{([^}]+)\}/g;
      const matches = new Set<string>();
      let match;
  
      while ((match = regex.exec(str)) !== null) {
          // Use the first non-null capturing group value
          const word = match[1] || match[2] || match[3];
          matches.add(word);
      }
  
      const uniqueMatches = Array.from(matches);
      return uniqueMatches
    }
    static replaceWords(htmlString: string, replacements: { [key: string]: string }): string {
        const regex = /\[\[([^\]]+?)\]\]|\{\{([^}]+?)\}\}|\[([^\]]+?)\]|\{([^}]+?)\}/g;
        const replacedString = htmlString.replace(regex, (match, p1, p2, p3, p4) => {
            const key = p1 || p2 || p3 || p4; // Use the first non-null capturing group value
            return replacements[key] || match; // Replace with value if key exists in replacements, else keep the original match
        });
        return replacedString;
    }
    static extractNodes(data: any): jsonProps[] 
    {
        console.log(data);
        if (Array.isArray(data)) 
        {
          return data.map(item => 
          {
            console.log(item);
            const { name, ...rest } = item;
            //console.log(name);
            //console.log(rest);
            return {
              name,
              children: Object.keys(rest).length ? this.extractNodes(Object.values(rest)[0]) : [],
              idx:0,
              propName:Object.keys(item)[0]
            };
          });
        } else if (typeof data === 'object') 
        {
          return [{
            name: Object.keys(data)[0],
            children: Object.values(data).length ? this.extractNodes(Object.values(data)[0]) : [],
            idx:0
          }];
        }
        return [];
      }
      public static setParentId(props:any[]):any[]
      {
         let parent = null;
         let newList: any[] = [];
         let items =  props.map((t,idx)=> 
         {
            if(t.isarray == true)
            {
                parent = t;
            }
            else{
                parent.childrens.push
            }
         });
         return items;

      }
      static groupBy(array: any[], key: string): { [key: string]: any[] } {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
          return result;
        }, {});
      }
  


}