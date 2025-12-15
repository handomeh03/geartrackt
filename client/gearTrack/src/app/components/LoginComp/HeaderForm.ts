import { Component } from "@angular/core";

@Component({
    selector:"headerForm-comp",
    standalone:true,
    template:`
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="./LOGO W.svg" alt="Your Company" class="mx-auto h-10 w-auto not-dark:hidden" />
    
  </div>
    
    `
})
export class headerForm{

}