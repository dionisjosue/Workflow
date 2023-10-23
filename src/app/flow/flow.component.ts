import { Component,AfterViewInit, ViewChild} from '@angular/core';
import { FlowService } from './Services/flow.service';
import { Flow } from './Classes/Flow';
import { FlowFilter } from './Classes/FlowFilter';
import { ConditionalComponent } from '../conditional/createConditional.component';
import { FlowStep } from '../flow-step/class/FlowStep';
import { Step } from '../step/Classes/Step';

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
    deleteFlow(item:Flow)
    {
        let self = this;
        this.flowRepo.removeData(item.id).subscribe({
          next:(data)=>{
              if(data.success)
              {
                self.flows = self.flows.filter(t=> t.id != item.id);
              }
              else{
                //MESSAGE ALERT
              }
          },
          error:(err)=>
          {
                //MESSAGE ALERT

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
