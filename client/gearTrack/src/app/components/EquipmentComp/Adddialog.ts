import { Component, Input, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/AuthService";
import { EquipmentSevice } from "../../services/Equipment";
import { Error } from "../Error/Error";

@Component({
  selector: "AddDialog-comp",
  standalone: true,
  imports: [FormsModule,Error],
  template: `
    
    @if(addFlag){
     
<div 
  
  class="fixed inset-0 bg-[#0000004a] bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
>
  
  <div 
    class="bg-[#0a0a0a] text-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
  >
    <h2 class="text-xl sm:text-2xl font-bold mb-4">Add Equipment</h2>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">Code</label>
      <input 
       (ngModelChange)="error=''"
        [(ngModel)]="code" 
        type="text" 
        class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]"
      />
    </div>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">Name</label>
      <input 
       (ngModelChange)="error=''"
        [(ngModel)]="name" 
        type="text" 
        class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]"
      />
    </div>

    
    <div class="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label class="block text-sm font-medium">Category</label>
        <select  (ngModelChange)="error=''" [(ngModel)]="category" class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]">
          <option value="camera">Camera</option>
          <option value="lens">Lens</option>
          <option value="lighting">Lighting</option>
          <option value="audio">Audio</option>
          <option value="drone">Drone</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Condition</label>
        <select  (ngModelChange)="error=''" [(ngModel)]="condition" class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]">
          <option value="available">Available</option>
          <option value="out">Out</option>
          <option value="overduecharging">Overdue Charging</option>
          <option value="needscharging">Needs Charging</option>
        </select>
      </div>
    </div>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">Location</label>
      <input  (ngModelChange)="error=''" [(ngModel)]="location" type="text" class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]" />
    </div>

    
    <div class="mb-3">
      <label class="block text-sm font-medium">Note</label>
      <textarea  (ngModelChange)="error=''" [(ngModel)]="note" rows="2" class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]"></textarea>
    </div>

    
    <div class="mb-4">
      <label class="block text-sm font-medium">Purchase Date</label>
      <input  (ngModelChange)="error=''" [(ngModel)]="purchaseDate" type="date" class="mt-1 w-full p-2 rounded border border-white/20 bg-[#0a0a0a] text-white focus:outline-none focus:border-[#4eda2c] focus:ring-[#4eda2c]" />
    </div>

    
    <div class="flex flex-col sm:flex-row justify-end gap-3">
      <button (click)="closeAddDialog()" class="px-4 py-2 bg-white/10 rounded hover:bg-white/20 w-full sm:w-auto">Cancel</button>
      <button (click)="onAddEquipment()" class="px-4 py-2 bg-[#4eda2c] rounded hover:bg-[#40c325] text-white w-full sm:w-auto">Add</button>
    </div>
      @if(error){
    <Error-comp [error]="error"/>
  }
  </div>

</div>

    }
  `
})
export class AddDialog {
  @Input() addFlag: boolean = false;
  @Input() openAddDialog!: () => void;
  @Input() closeAddDialog!: () => void;
  private token = sessionStorage.getItem("token") || "";

  error :string = "";

  code = "";
  name = "";
  category = "camera";
  condition = "available";
  location = "";
  note = "";
  purchaseDate = "11/01/2022";
  photo = "https://s.studiobinder.com/wp-content/uploads/2016/11/The-Best-4K-Video-Cameras-for-Filmmakers-Header.jpg";

  constructor( private equipmentService: EquipmentSevice) {}

 
  

  onAddEquipment() {
    const isoDate = new Date(this.purchaseDate).toISOString();
    const value = { code: this.code, name: this.name, category: this.category, condition: this.condition, location: this.location, note: this.note, purchaseDate: isoDate, photo: this.photo };
    

    this.equipmentService.addEquipmwnt(value, this.token).subscribe({
      next: (res) => {
        const current = this.equipmentService.Equipment() ?? [];
        this.equipmentService.Equipment.set([ res.newEquipmentRecourd,...current]);
         this.equipmentService.orginalEquipment.set([res.newEquipmentRecourd,...current]);
        this.closeAddDialog();
        this.resetFields();
      },
      error: (err) => {
        this.error=err.error.error;
      }
    });
  }

  resetFields() {
    this.code = "";
    this.name = "";
    this.category = "camera";
    this.condition = "available";
    this.location = "";
    this.note = "";
    this.purchaseDate = "";
  }
}
