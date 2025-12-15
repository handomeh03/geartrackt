import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";


@Component({
    selector:"loader",
    standalone:true,
    styleUrl:"./loader.css",
    imports: [CommonModule], 
    template:`

   
<div class="containerLoader" [ngClass]="{ 'bg-white': color }"  [ngClass]="{ 'bg-black': !color }">

  <div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div>
</div>

    `,
  
})
export class loader{
    @Input ({required:true}) color !: boolean;

}