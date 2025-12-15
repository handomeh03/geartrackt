import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../services/userservice";
import { EquipmentSevice } from "../../services/Equipment";
import { editDialog } from "./editequpmintDialog";


@Component({
    selector:"equipmentcard-comp",
    standalone:true,
    imports:[editDialog],
    styleUrl:"./EquipmentCard.css",
    template:`
 <div class="group relative border border-gray-200 rounded-xl p-4 bg-white hover:shadow-2xl transition-all duration-300 ease-in-out">
  <div class="overflow-hidden rounded-lg">
    <img 
      [src]="'https://s.studiobinder.com/wp-content/uploads/2016/11/The-Best-4K-Video-Cameras-for-Filmmakers-Header.jpg'" 
      [alt]="equipment.name" 
      class="aspect-square w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-80"
    />
  </div>
  
  <div class="mt-4 flex justify-between items-start">
    <div>
      <h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {{ equipment.name }}
      </h3>
      <p class="mt-1 text-sm text-gray-500 capitalize">category: {{ equipment.category }}</p>
      <p class="mt-1 text-sm text-gray-500 capitalize">condition: {{ equipment.condition }}</p>
      <p class="mt-1 text-sm text-gray-500 capitalize">location: {{ equipment.location }}</p>
      <p class="mt-1 text-sm text-gray-400">Purchased: {{ equipment.purchaseDate.split("T")[0] }}</p>
      <p class="mt-1 text-sm text-gray-400">note: {{ equipment.note}}</p>
    </div>
    
    <p class="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
      {{ equipment.code }}
    </p>
  </div>

  <!-- Buttons Section -->
  <div class="mt-4 flex flex-wrap justify-center gap-10">
   @if(user?.role=="admin"){
    <button class="bg-zinc-900 hover:bg-zinc-700" (click)="onopenEditFlagdialog()">
       <span>
    
       Edit
      </span>
</button>

<button class="bg-zinc-900 hover:bg-zinc-700" (click)="ondelete(equipment._id)">
       <span>
    
       Delete
      </span>
</button>
   }
 
  </div>
  <edit-dialog [equipment]="equipment" [editFalgDialog]="editFalgDialog" [oncloseEditFlagDialog]="oncloseEditFlagDialog" />
 
</div>

    
    `
})
export class equipmentcard implements OnInit{
    @Input ({required:true}) equipment!:{ _id:string,  code:string, name: string, category: string, condition: string, location: string, note: string, purchaseDate: string,  photo: string,  user: string,createdAt: string};
    user: { id: string; fullName: string; email: string; role: string; status: boolean } | null = null;

    editFalgDialog:boolean=false;

    checkoutFlag:boolean=false;

    
    constructor (private UserService:UserService,private EquipmentSevice:EquipmentSevice){}

   ngOnInit(): void {
     this.user=this.UserService.user();
   }
   ondelete(id:string){
     const token = sessionStorage.getItem("token") || "";
       this.EquipmentSevice.deleteEquipment(id,token).subscribe({
        next:(res)=>{
          const current = this.EquipmentSevice.Equipment() || [];
          this.EquipmentSevice.Equipment.set(current.filter((e)=>{
            return e._id!=id;
          }))
          this.EquipmentSevice.orginalEquipment.set(current.filter((e)=>{
            return e._id!=id;
          }))

        },
        error:(err)=>{
              console.log(err.error.error);
        }
       })
   } 

   oncloseEditFlagDialog=()=>{
    this.editFalgDialog=false;
   }
   onopenEditFlagdialog=()=>{
    this.editFalgDialog=true;
   }
   onclosecheckoutDialog=()=>{
    this.checkoutFlag=false;
   }
   onOpencheckoutdialog=()=>{
    this.checkoutFlag=true;
   }
   
}