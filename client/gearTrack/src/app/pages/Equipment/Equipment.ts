import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';

import { equipmentcard } from '../../components/EquipmentComp/EquipmentCard';
import { AddDialog } from '../../components/EquipmentComp/Adddialog';
import { SearchEq } from '../../components/EquipmentComp/SearchEquipment';
import { CommonModule } from '@angular/common';
import { EquipmentSevice } from '../../services/Equipment';
import { UserService } from '../../services/userservice';
import { loader } from '../../components/Loader/Loader';
import { editDialog } from '../../components/EquipmentComp/editequpmintDialog';
interface EquipmentItem {
  _id: string;
  code: string;
  name: string;
  category: string;
  condition: string;
  location: string;
  note: string;
  purchaseDate: string;
  photo: string;
  user: string;
  createdAt: string;
}
@Component({
  selector: 'Equipments-comp',
  standalone: true,
  styleUrl:"./Equipment.css",
  imports: [equipmentcard, AddDialog,SearchEq,CommonModule,loader],
  template: `
    
    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg  shadow  border-[#0a0a0a]">
      @if(UserService.user()?.role=="admin"){
        <div class="px-4 py-5  sm:px-6">
         <SearchEq-comp [orginalEquipment]="EquipmentSevice.orginalEquipment()" />
      </div>
      }

      @if(loader){
        <loader [color]="true"/>
      }@else {



      
      <div class="px-4 py-2 sm:p-6">
      @if(UserService.user()?.role=="admin"){
       
<button class="bg-zinc-900" (click)="openAddDialog()">
  <span >
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
    </svg>
    Add
  </span>
</button>

  
      }

        <div class="bg-white">
          <div class="mx-auto max-w-2xl    lg:max-w-7xl ">
            <h2 class="text-2xl font-bold mb-3.5 tracking-tight ">Equipments</h2>
           @if( !EquipmentSevice.Equipment() || EquipmentSevice.Equipment().length==0 ){
             
             <h1 class="text-center bg-red-600 p-4 text-white rounded-3xl text-4xl w-full">{{error || 'No Equipment Founds'}}</h1>
           }@else {
                <div
              class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
            >
              @for(e of EquipmentSevice.Equipment();track e._id){
              <equipmentcard-comp [equipment]="e" />
              }
            </div>
           }
           
          </div>
        </div>
      </div>

      <AddDialog-comp [openAddDialog]="openAddDialog" [closeAddDialog]="closeAddDialog" [addFlag]="addFlag()"/>
      }
    </div>
  `,
})
export class Equipment implements OnInit {
   loader :boolean=false;
   error:string="";
   addFlag=signal<boolean>(false);
   
   constructor(protected EquipmentSevice:EquipmentSevice,protected UserService:UserService){}


  ngOnInit(): void {
    if(this.UserService.user()?.role=="admin"){
          this.getAllEquipment(); 
    }
    else{
      this.getAvaibleEquipment();
    }
    
  }

 closeAddDialog = () => { this.addFlag.set(false); }
 openAddDialog = () => { this.addFlag.set(true); }
  

  getAllEquipment(){
     this.loader=true;
     this.EquipmentSevice.getAllEquipments().subscribe({
      next:(res)=>{
        this.EquipmentSevice.Equipment.set(res.Equipments);
        this.EquipmentSevice.orginalEquipment.set(res.Equipments);
         this.loader=false;
         this.error="";
      },
      error:(err)=>{
          this.EquipmentSevice.Equipment.set([]);
          this.EquipmentSevice.orginalEquipment.set([]);
          this.error=err.error?.error || "no data found";
          this.loader=false;
      }
     })
  }
  getAvaibleEquipment(){
    this.loader=true;
    this.EquipmentSevice.getAllavaibleEquipment("ALL").subscribe({
      next:(res)=>{
         this.EquipmentSevice.Equipment.set(res.Equipments);
          this.loader=false;
         this.error="";
      },
      error:(err)=>{
        this.EquipmentSevice.Equipment.set([]);
         this.error=err.error?.error || "no data found";
        this.loader=false;
      }
    })
  }
}
