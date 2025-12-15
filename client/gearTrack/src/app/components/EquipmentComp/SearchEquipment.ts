import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { EquipmentSevice } from '../../services/Equipment';
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
  selector: 'SearchEq-comp',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input
        [(ngModel)]="search"
        (ngModelChange)="onSearch()"
        id="search"
        type="text"
        name="search"
        placeholder="search"
        aria-label="search"
        class="block w-full rounded-md bg-white p-4 text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0a0a0a] sm:text-sm/6 "
      />
    </div>
  `,
})
export class SearchEq {
  search = '';
  
  @Input ({required:true}) orginalEquipment !: EquipmentItem[] | null;
  constructor(private EquipmentSevice: EquipmentSevice) {
    
  }
 onSearch() {
  
  const value = this.search; 
  const token = sessionStorage.getItem("token") || "";
  setTimeout(() => {
  
    if (value !== this.search) return;

    this.EquipmentSevice.searchEquipment(this.search,token).subscribe({
      next: (res) => {
        this.EquipmentSevice.Equipment.set(res.equipments);
      },
      error: (err) => {
        if (this.search == "") {
          this.EquipmentSevice.Equipment.set(this.EquipmentSevice.orginalEquipment());
        } else {
          this.EquipmentSevice.Equipment.set([]);
        }
      },
    });
  }, 300);
}

}
