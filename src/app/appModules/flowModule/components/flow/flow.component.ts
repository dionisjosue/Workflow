import { Component,AfterViewInit, ViewChild} from '@angular/core';
import { Flow } from '../../classes/Flow';
import { FlowFilter } from '../../classes/FlowFilter';
import { FlowService } from '../../services/flow.service';
import { FlowStep } from '../../classes/FlowStep';
import { ConditionalComponent } from '@conditional/components/createConditional/createConditional.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements AfterViewInit {

 
    flows:Array<Flow>;
    filters:FlowFilter;

    @ViewChild('conditionals') conditionals:ConditionalComponent

    constructor(private flowRepo:FlowService)
    {
      this.filters = new FlowFilter();
    }
    ngAfterViewInit(): void 
    {
      this.flowRepo.getData(this.filters).subscribe(
        {
          next:(data)=>
          {
            console.log(data);
            if(data.result.success){
              this.flows = data.items;
            }
            else{
              //MESSAGE ALERT 
            }
          }
        }
      )
    }
    deleteFlow(item:Flow)
    {
        let self = this;
        this.flowRepo.removeData(item.id).subscribe({
          next:(data)=>{
              if(data.result.success)
              {
                self.flows = self.flows.filter(t=> t.id != item.id);
              }
              else{
                //MESSAGE ALERT INVOKE DIALOG O INFORM TO THE USER
              }
          }
        })
    }
    openConditions(step:FlowStep,steps:Array<FlowStep>){
      console.log(steps);
      this.conditionals.flowStep =step;
      this.conditionals.steps = steps;
      step.conditionals.map((t,idx)=> t.orderId = idx);
      this.conditionals.conditionals = step.conditionals;
      this.conditionals.open();
    }
}
