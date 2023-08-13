import { Component,AfterViewInit} from '@angular/core';
import { FlowService } from './Services/flow.service';
import { Flow } from './Classes/Flow';
import { FlowFilter } from './Classes/FlowFilter';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements AfterViewInit {

 
    flows:Array<Flow>;
    filters:FlowFilter;
    constructor(private flowRepo:FlowService)
    {
      this.filters = new FlowFilter();
    }
    ngAfterViewInit(): void 
    {
      this.flowRepo.getFlows(this.filters).subscribe(
        {
          next:(data)=>
          {
            if(data.success){
              this.flows = data.items;
            }
            else{
              //MESSAGE ALERT 
            }
          },
          error:(err)=>{
            console.log(err);
            //MESSAGE ALERT
          }
        }
      )
    }
}
